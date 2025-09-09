/*
 * League of Legends Draft Analysis Algorithm
 */

const COUNTER_MAPPING = {
  physicalDamage: ["tankiness", "disengage"],
  magicDamage: ["sustain", "tankiness"],

  burst: ["peel", "tankiness"],
  dps: ["tankiness", "peel"],
  poke: ["sustain", "engage"],
  range: ["engage", "mobility"],
  
  tankiness: ["dps"],
  sustain: ["burst"],
  mobility: ["hardCC", "engage"],
  disengage: ["burst", "poke", "range"],
  
  hardCC: ["mobility", "dps", "burst", "peel"],
  areaControl: ["mobility"],
  engage: ["disengage", "mobility"],
  peel: ["burst", "engage"],
  
  vision: ["engage", "burst", "hardCC"],
  teamBuffs: ["burst", "dps", "engage"],
  waveclear: ["engage", "burst"],
};

const INVERSE_COUNTER_MAPPING = {};
Object.entries(COUNTER_MAPPING).forEach(([attr, counters]) => {
  counters.forEach(counter => {
    if (!INVERSE_COUNTER_MAPPING[counter]) {
      INVERSE_COUNTER_MAPPING[counter] = [];
    }
    INVERSE_COUNTER_MAPPING[counter].push(attr);
  });
});

const SYNERGY_MAPPING = {
    physicalDamage: ["magicDamage", "areaControl"],
    magicDamage: ["physicalDamage"],

    burst: ["engage", "hardCC"],
    dps: ["peel", "sustain", "tankiness"],
    poke: ["vision", "range"],
    range: ["poke", "disengage", "waveclear"],

    tankiness: ["sustain", "engage"],
    sustain: ["tankiness", "waveclear"],
    mobility: ["burst", "mobility", "engage"],
    disengage: ["poke", "vision", "range"],

    hardCC: ["burst", "dps", "engage"],
    areaControl: ["poke", "dps"],
    engage: ["burst", "hardCC"],
    peel: ["dps", "teamBuffs"],

    vision: ["engage"],
    teamBuffs: ["tankiness", "dps"],
    waveclear: ["dps", "range"],

    early: ["engage", "burst"],
    mid: ["waveclear"],
    late: ["tankiness", "teamBuffs"]
}

// Number of top attributes to consider as enemy team's strengths
const TOP_ATTRIBUTES_COUNT = 6;

// Weight adjustments
const COUNTER_WEIGHT_BONUS = 0.5;
const SYNERGY_WEIGHT_BONUS = 0.5;
const VARIANCE_BONUS_SCALE = 1.5;

/**
 * Flattens a champion's characteristics into a single level object
 * @param {Object} champion - Champion object with characteristics
 * @returns {Object} Flattened characteristics object
 */
function flattenCharacteristics(champion) {
  if (!champion || !champion.characteristics) return {};
  
  const flat = {};
  for (const category in champion.characteristics) {
    for (const [key, value] of Object.entries(champion.characteristics[category])) {
      flat[key] = value || 0; // Default to 0 if value is undefined
    }
  }
  return flat;
}

/**
 * Calculates the average of an array of numbers
 * @param {number[]} values - Array of numbers
 * @returns {number} Average value
 */
function calculateAverage(values) {
  if (!values.length) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

/**
 * Calculates the variance of an array of numbers
 * @param {number[]} values - Array of numbers
 * @returns {number} Variance
 */
function calculateVariance(values) {
  if (values.length <= 1) return 0;
  const avg = calculateAverage(values);
  const squareDiffs = values.map(value => Math.pow(value - avg, 2));
  return calculateAverage(squareDiffs);
}

/**
 * Gets the top N attributes with highest average values from a team
 * @param {Object[]} team - Array of champion objects
 * @param {number} count - Number of top attributes to return
 * @returns {string[]} Array of attribute names
 */
function getTopAttributes(team, count) {
  if (!team.length) return [];
  
  // Initialize attribute sums
  const attributeSums = {};
  
  team.forEach(champion => {
    const flat = flattenCharacteristics(champion);
    Object.entries(flat).forEach(([attr, value]) => {
      attributeSums[attr] = (attributeSums[attr] || 0) + value;
    });
  });
  
  // Sort by raw totals instead of averages
  return Object.entries(attributeSums)
    .map(([attr, sum]) => ({
      attribute: attr,
      value: sum
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, count)
    .map(item => item.attribute);
}

/**
 * Calculates attribute weights based on enemy team and ally weaknesses
 * @param {Object[]} enemyTeam - Array of enemy champions
 * @param {Object[]} allyTeam - Array of ally champions
 * @returns {Object} Weights for each attribute
 */
function calculateWeights(enemyTeam, allyTeam) {
  const weights = {};
  
  // Initialize all weights to 1.0
  const allAttributes = new Set([
    ...Object.keys(COUNTER_MAPPING),
    ...Object.keys(SYNERGY_MAPPING),
    ...[...enemyTeam, ...allyTeam].flatMap(champ => Object.keys(flattenCharacteristics(champ)))
  ]);
  allAttributes.forEach(attr => weights[attr] = 1.0);

  // Flatten enemy team for attribute values
  const flatEnemies = enemyTeam.map(champ => flattenCharacteristics(champ));
  const flatAllies = allyTeam.map(champ => flattenCharacteristics(champ));

  function averageAttribute(flatTeam, attr) {
    let total = 0, count = 0;
    flatTeam.forEach(flat => {
      if (flat[attr] !== undefined) {
        total += flat[attr];
        count++;
      }
    });
    return count > 0 ? total / count : 0;
  }
  
  // Increase weights for counter attributes proportional to enemy strength
  const enemyHighlights = getTopAttributes(enemyTeam, TOP_ATTRIBUTES_COUNT);
  enemyHighlights.forEach(highlight => {
    const avgHighlightValue = averageAttribute(flatEnemies, highlight);
    const counters = COUNTER_MAPPING[highlight] || [];
    counters.forEach(counter => {
      if (weights.hasOwnProperty(counter)) {
        weights[counter] += avgHighlightValue * COUNTER_WEIGHT_BONUS;
      }
    });
  });

  // Decrease weights for ally team's strengths based on enemy counters
  const allyHighlights = getTopAttributes(allyTeam, TOP_ATTRIBUTES_COUNT);
  allyHighlights.forEach(highlight => {
    const avgAllyValue = averageAttribute(flatAllies, highlight);
    if (!avgAllyValue) return;

    const enemyCounters = INVERSE_COUNTER_MAPPING[highlight] || [];
    enemyCounters.forEach(enemyAttr => {
      const avgEnemyValue = averageAttribute(flatEnemies, enemyAttr);
      if (avgEnemyValue > 0 && weights.hasOwnProperty(highlight)) {
        weights[highlight] -= avgEnemyValue * COUNTER_WEIGHT_BONUS;
        if (weights[highlight] < 1) weights[highlight] = 1; // floor to avoid negatives
      }
    });
  });

  // Calculate synergy with allies
  allyHighlights.forEach(highlight => {
    const avgAllyValue = averageAttribute(flatAllies, highlight);
    const synergies = SYNERGY_MAPPING[highlight] || [];
    synergies.forEach(synergyAttr => {
      if (weights.hasOwnProperty(synergyAttr)) {
        weights[synergyAttr] += avgAllyValue * SYNERGY_WEIGHT_BONUS;
      }
    });
  });
  
  return weights;
}

/**
 * Ranks champions based on the current draft state
 * @param {Object[]} allyTeam - Array of ally champion names
 * @param {Object[]} enemyTeam - Array of enemy champion names
 * @param {string[]} candidatePool - Array of champion names to consider
 * @param {Object} championDB - Full champion database (championStats)
 * @returns {Array} Sorted array of { name, final_score } objects
 */
function rankChampions(allyTeam, enemyTeam, candidatePool, championDB) {
  if (!candidatePool?.length || !championDB) return [];
  
  // Convert champion names to champion objects from the database
  const allyChampions = allyTeam
    .map(name => ({
      name,
      ...(championDB[name] || { characteristics: {} })
    }))
    .filter(champ => champ.characteristics);
    
  const enemyChampions = enemyTeam
    .map(name => ({
      name,
      ...(championDB[name] || { characteristics: {} })
    }))
    .filter(champ => champ.characteristics);
  
  const weights = calculateWeights(enemyChampions, allyChampions);
  const allyHighlights = getTopAttributes(allyChampions, TOP_ATTRIBUTES_COUNT);
  
  // Calculate ally team's current variance in highlighted attributes
  let allyVarianceBefore = 0;
  if (allyChampions.length > 0 && allyHighlights.length > 0) {
    const allyValues = {};
    
    // Collect values for highlighted attributes across ally team
    allyChampions.forEach(champion => {
      const flat = flattenCharacteristics(champion);
      allyHighlights.forEach(attr => {
        if (!allyValues[attr]) allyValues[attr] = [];
        allyValues[attr].push(flat[attr] || 0);
      });
    });
    
    // Calculate average variance across all highlighted attributes
    const variances = [];
    Object.values(allyValues).forEach(values => {
      if (values.length > 1) {
        variances.push(calculateVariance(values));
      }
    });
    
    allyVarianceBefore = variances.length > 0 ? calculateAverage(variances) : 0;
  }
  
  // Score each candidate champion
  const scoredCandidates = candidatePool.map(championName => {
    const champion = championDB[championName];
    if (!champion?.characteristics) {
      return { name: championName, final_score: 0 };
    }
    
    const flat = flattenCharacteristics(champion);
    let baseScore = 0;
    
    // Calculate base score using weighted sum of attributes
    Object.entries(flat).forEach(([attr, value]) => {
      const weight = weights[attr] || 1.0;
      baseScore += (value || 0) * weight;
    });
    
    // Calculate variance bonus if there are enemy highlights and allies
    let varianceBonus = 0;
    if (allyChampions.length > 0 && allyHighlights.length > 0 && allyVarianceBefore > 0) {
      const allyPlusCandidate = [...allyChampions, { ...champion, name: championName }];
      const allyValuesAfter = {};
      
      // Collect values for highlighted attributes across ally team + candidate
      allyPlusCandidate.forEach(champ => {
        const champFlat = flattenCharacteristics(champ);
        allyHighlights.forEach(attr => {
          if (!allyValuesAfter[attr]) allyValuesAfter[attr] = [];
          allyValuesAfter[attr].push(champFlat[attr] || 0);
        });
      });
      
      // Calculate average variance after adding candidate
      const variancesAfter = [];
      Object.values(allyValuesAfter).forEach(values => {
        if (values.length > 1) {
          variancesAfter.push(calculateVariance(values));
        }
      });
      
      const allyVarianceAfter = variancesAfter.length > 0 ? calculateAverage(variancesAfter) : 0;
      const varianceReduction = Math.max((allyVarianceBefore - allyVarianceAfter) / allyVarianceBefore, 0);
      varianceBonus = varianceReduction * VARIANCE_BONUS_SCALE;
    }
    
    const finalScore = baseScore + varianceBonus;
    
    return {
      name: championName,
      final_score: parseFloat(finalScore.toFixed(2))
    };
  });
  
  // Sort by final score in descending order
  return scoredCandidates.sort((a, b) => b.final_score - a.final_score);
}

export {
  rankChampions
};
