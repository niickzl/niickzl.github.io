/**
 * League of Legends Draft Analysis Algorithm
 * 
 * This module provides functions to analyze enemy team composition and
 * recommend optimal champion picks based on the current draft state.
 */

// Mapping of champion attributes to their counter attributes (flattened structure)
const COUNTER_MAPPING = {
  // Damage Profile
  physicalDamage: ["tankiness", "disengage"],
  magicDamage: ["sustain", "tankiness"],
  trueDamage: ["tankiness", "mobility"],
  burst: ["sustain", "peel"],
  dps: ["tankiness", "peel"],
  
  // Survivability
  tankiness: ["burst", "dps", "physicalDamage"],
  sustain: ["burst", "magicDamage"],
  mobility: ["hardCC", "engage"],
  disengage: ["engage", "burst"],
  
  // Crowd Control
  hardCC: ["mobility", "dps", "burst"],
  softCC: ["dps", "sustain"],
  engage: ["disengage", "mobility"],
  peel: ["burst", "engage"],
  
  // Utility
  vision: ["engage", "burst", "hardCC"],
  teamBuffs: ["burst", "dps", "engage"],
  waveclear: ["engage", "burst"],
  objectiveControl: ["mobility", "disengage"],
  
  // Scaling
  early: ["scaling"],
  mid: ["scaling"],
  late: ["scaling"]
};

// Number of top attributes to consider as enemy team's strengths
const TOP_ATTRIBUTES_COUNT = 5;

// Weight adjustments
const COUNTER_WEIGHT_BONUS = 0.5;
const WEAKNESS_MULTIPLIER = 1.2;
const VARIANCE_BONUS_SCALE = 10;

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
  
  // Initialize attribute sums and counts
  const attributeSums = {};
  const attributeCounts = {};
  
  // Sum up all attribute values across the team
  team.forEach(champion => {
    const flat = flattenCharacteristics(champion);
    Object.entries(flat).forEach(([attr, value]) => {
      attributeSums[attr] = (attributeSums[attr] || 0) + value;
      attributeCounts[attr] = (attributeCounts[attr] || 0) + 1;
    });
  });
  
  // Calculate averages and sort by value
  const avgAttributes = Object.entries(attributeSums)
    .map(([attr, sum]) => ({
      attribute: attr,
      value: sum / attributeCounts[attr]
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, count)
    .map(item => item.attribute);
  
  return avgAttributes;
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
  const allAttributes = new Set();
  [...enemyTeam, ...allyTeam].forEach(champ => {
    const flat = flattenCharacteristics(champ);
    Object.keys(flat).forEach(attr => allAttributes.add(attr));
  });
  
  allAttributes.forEach(attr => {
    weights[attr] = 1.0;
  });
  
  // Get enemy team's top attributes
  const enemyHighlights = getTopAttributes(enemyTeam, TOP_ATTRIBUTES_COUNT);
  
  // Increase weights for counter attributes
  enemyHighlights.forEach(highlight => {
    const counters = COUNTER_MAPPING[highlight] || [];
    counters.forEach(counter => {
      if (weights.hasOwnProperty(counter)) {
        weights[counter] += COUNTER_WEIGHT_BONUS;
      }
    });
  });
  
  // Increase weights for ally team's weaknesses
  if (allyTeam.length > 0) {
    const allyAverages = {};
    const allyCounts = {};
    
    // Calculate ally team averages for each attribute
    allyTeam.forEach(champ => {
      const flat = flattenCharacteristics(champ);
      Object.entries(flat).forEach(([attr, value]) => {
        allyAverages[attr] = (allyAverages[attr] || 0) + value;
        allyCounts[attr] = (allyCounts[attr] || 0) + 1;
      });
    });
    
    // Apply weakness multiplier to attributes where ally average is low
    Object.entries(allyAverages).forEach(([attr, sum]) => {
      const avg = sum / allyCounts[attr];
      if (avg <= 4 && weights[attr] !== undefined) {
        weights[attr] *= WEAKNESS_MULTIPLIER;
      }
    });
  }
  
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
  const enemyHighlights = getTopAttributes(enemyChampions, TOP_ATTRIBUTES_COUNT);
  
  // Calculate ally team's current variance in highlighted attributes
  let allyVarianceBefore = 0;
  if (allyChampions.length > 0 && enemyHighlights.length > 0) {
    const allyValues = {};
    
    // Collect values for highlighted attributes across ally team
    allyChampions.forEach(champion => {
      const flat = flattenCharacteristics(champion);
      enemyHighlights.forEach(attr => {
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
    if (allyChampions.length > 0 && enemyHighlights.length > 0 && allyVarianceBefore > 0) {
      const allyPlusCandidate = [...allyChampions, { ...champion, name: championName }];
      const allyValuesAfter = {};
      
      // Collect values for highlighted attributes across ally team + candidate
      allyPlusCandidate.forEach(champ => {
        const champFlat = flattenCharacteristics(champ);
        enemyHighlights.forEach(attr => {
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
  rankChampions,
  flattenCharacteristics,
  calculateWeights,
  getTopAttributes
};
