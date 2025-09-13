// League of Legends Draft Analysis Algorithm - Nick Lei

const COUNTER_MAPPING = {
  burst: ["peel", "tankiness"],
  dps: ["mobility", "sustain"],
  poke: ["mobility", "sustain"],
  aoe: ["tankiness", "peel"],
  
  tankiness: ["dps", "poke"],
  sustain: ["burst", "aoe"],
  mobility: ["dps", "burst"],
  peel: ["poke", "aoe"],
  
  vision: ["tankiness"],
  objectiveControl: ["peel"],
  waveclear: ["sustain"],
  roam: ["mobility"]
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
    burst: ["mobility", "sustain"],
    dps: ["peel", "tankiness"],
    poke: ["tankiness", "peel"],
    aoe: ["sustain", "mobility"],

    tankiness: ["poke", "dps"],
    sustain: ["aoe", "burst"],
    mobility: ["burst", "aoe"],
    peel: ["dps", "poke"],

    vision: ["poke"],
    objectiveControl: ["dps"],
    waveclear: ["aoe"],
    roam: ["burst"],

    early: ["early"],
    mid: ["late"],
    late: ["mid"]
}

const DAMAGETYPE_KEYS = ["burst", "dps", "poke", "aoe"];
const SURVIVABILITY_KEYS = ["tankiness", "sustain", "mobility", "peel"];
const UTILITY_KEYS = ["waveclear", "objectiveControl", "vision", "roam"];
const SCALING_KEYS = ["early", "mid", "late"];

function flattenCharacteristics(champion) {
  if (!champion || !champion.characteristics) return {};
  
  const flat = {};
  for (const category in champion.characteristics) {
    for (const [key, value] of Object.entries(champion.characteristics[category])) {
      flat[key] = value || 0;
    }
  }
  return flat;
}

/**
 * Sum a single attribute across a team (array of champion objects, not names)
 */
function teamSumAttribute(team, attr) {
  if (!team?.length) return 0;
  return team.reduce((s, champ) => s + (flattenCharacteristics(champ)[attr] || 0), 0);
}

/**
 * Average attribute across team (sum / team.length)
 */
function teamAvgAttribute(team, attr) {
  if (!team?.length) return 0;
  return teamSumAttribute(team, attr) / team.length;
}

/**
 * Get top-2 attribute groups for a given set of keys (like DAMAGETYPE_KEYS)
 * Returns { firstTop: [attrs...], secondTop: [attrs...] }
 * - If firstTop ties (multiple attrs share max), we return them in firstTop.
 * - secondTop may include multiple attributes that tie for the second-highest value.
 */
function getTopTwoAttrsForCategory(team, keys) {
  const sums = {};
  keys.forEach(k => sums[k] = teamSumAttribute(team, k) );

  // find max (first)
  const max1 = Math.max(...Object.values(sums));
  const firstTop = Object.keys(sums).filter(k => sums[k] === max1);

  // If all zero or only one attr exists, secondTop may be empty
  const remainingKeys = Object.keys(sums).filter(k => sums[k] !== max1);
  let secondTop = [];
  if (remainingKeys.length > 0) {
    const max2 = Math.max(...remainingKeys.map(k => sums[k]));
    secondTop = remainingKeys.filter(k => sums[k] === max2);
  }

  return { firstTop, secondTop, sums };
}

/**
 * Get bottom-2 attribute groups for a given set of keys (lowest sums)
 * Returns { firstBottom: [attrs...], secondBottom: [attrs...] }
 * - If firstBottom ties (multiple attrs share min), return them all.
 * - secondBottom may include multiple attributes that tie for the second-lowest value.
 */
function getBottomTwoAttrsForCategory(team, keys) {
  const sums = {};
  keys.forEach(k => sums[k] = teamSumAttribute(team, k) );

  const min1 = Math.min(...Object.values(sums));
  const firstBottom = Object.keys(sums).filter(k => sums[k] === min1);

  const remainingKeys = Object.keys(sums).filter(k => sums[k] !== min1);
  let secondBottom = [];
  if (remainingKeys.length > 0) {
    const min2 = Math.min(...remainingKeys.map(k => sums[k]));
    secondBottom = remainingKeys.filter(k => sums[k] === min2);
  }

  return { firstBottom, secondBottom, sums };
}

/**
 * Safely get candidate's flattened value for an attribute
 */
function candidateAttrValue(flatCandidate, attr) {
  return flatCandidate?.[attr] || 0;
}

/**
 * MAIN: new rankChampions function following your spec
 */
function rankChampions(allyTeamNames, enemyTeamNames, candidatePool, championDB) {
  if (!candidatePool?.length || !championDB) return [];

  // Convert names -> champion object
  const allyChampions = allyTeamNames
    .map(name => ({ name, ...(championDB[name] || { characteristics: {} }) }))
    .filter(c => c.characteristics);
  const enemyChampions = enemyTeamNames
    .map(name => ({ name, ...(championDB[name] || { characteristics: {} }) }))
    .filter(c => c.characteristics);

  const numAllies = allyChampions.length || 0;
  const numEnemies = enemyChampions.length || 0;

  // Helper: sum of two specific DamageProfile attributes for team
  const allyPhysSum = teamSumAttribute(allyChampions, "physicalDamage");
  const allyMagicSum = teamSumAttribute(allyChampions, "magicDamage");

  // For categories we will use helper functions to get top2/bottom2
  const allyDamageTypeTop = getTopTwoAttrsForCategory(allyChampions, DAMAGETYPE_KEYS);
  const allySurvivabilityTop = getTopTwoAttrsForCategory(allyChampions, SURVIVABILITY_KEYS);
  const allyUtilityTop = getTopTwoAttrsForCategory(allyChampions, UTILITY_KEYS);
  const allyScalingTop = getTopTwoAttrsForCategory(allyChampions, SCALING_KEYS);

  const enemyDamageTypeTop = getTopTwoAttrsForCategory(enemyChampions, DAMAGETYPE_KEYS);
  const enemySurvivabilityTop = getTopTwoAttrsForCategory(enemyChampions, SURVIVABILITY_KEYS);
  const enemyUtilityTop = getTopTwoAttrsForCategory(enemyChampions, UTILITY_KEYS);
  const enemyScalingTop = getTopTwoAttrsForCategory(enemyChampions, SCALING_KEYS);

  // Evaluate each candidate
  const scoredCandidates = candidatePool.map(championName => {
    const champion = championDB[championName];
    if (!champion?.characteristics) return { name: championName, final_score: 0 };

    const flatCand = flattenCharacteristics(champion);
    let finalScore = 0;

    //
    // DAMAGEPROFILE (absolute difference physical - magic)
    //
    {
      const beforeDiff = Math.abs(allyPhysSum - allyMagicSum);
      const afterPhys = allyPhysSum + (flatCand.physicalDamage || 0);
      const afterMagic = allyMagicSum + (flatCand.magicDamage || 0);
      const afterDiff = Math.abs(afterPhys - afterMagic);
      if (afterDiff < beforeDiff) finalScore += (beforeDiff - afterDiff);

      // then average (physical + magic) / numAllies and if < 3 apply multiplier
      if (numAllies > 0) {
        const avgPhyMag = (allyPhysSum + allyMagicSum) / numAllies;
        if (avgPhyMag < 3) {
          const bonusMult = 2 - avgPhyMag + numAllies;
          const add = ((flatCand.physicalDamage || 0) * bonusMult) + ((flatCand.magicDamage || 0) * bonusMult);
          finalScore += add;
        }
      }
    }

    //
    // DAMAGETYPE, SURVIVABILITY, UTILITY, SCALING follow same pattern as DamageType
    //
    function processCategoryTopPair(categoryTopInfo) {
      const top1 = categoryTopInfo.firstTop;
      const top2 = categoryTopInfo.secondTop;
      if (top1.length === 1 && top2.length > 0) {
        const a1 = top1[0];
        // compute best gain across all secondTop attributes
        let bestGain = 0;
        top2.forEach(a2 => {
          const beforeDiff = Math.abs(teamSumAttribute(allyChampions, a1) - teamSumAttribute(allyChampions, a2));
          const afterDiff = Math.abs(
            (teamSumAttribute(allyChampions, a1) + candidateAttrValue(flatCand, a1)) -
            (teamSumAttribute(allyChampions, a2) + candidateAttrValue(flatCand, a2))
          );
          if (afterDiff < beforeDiff) bestGain = Math.max(bestGain, beforeDiff - afterDiff);
        });
        return bestGain;
      }
      return 0;
    }

    finalScore += processCategoryTopPair(allyDamageTypeTop);
    finalScore += processCategoryTopPair(allySurvivabilityTop);
    finalScore += processCategoryTopPair(allyUtilityTop);
    finalScore += processCategoryTopPair(allyScalingTop);

    //
    // ESSENTIAL (hardCC vs engage) — same as DamageProfile, plus multiplier if avg < 4
    //
    {
      const allyHard = teamSumAttribute(allyChampions, "hardCC");
      const allyEng = teamSumAttribute(allyChampions, "engage");
      const beforeDiff = Math.abs(allyHard - allyEng);
      const afterDiff = Math.abs(
        (allyHard + (flatCand.hardCC || 0)) - (allyEng + (flatCand.engage || 0))
      );
      if (afterDiff < beforeDiff) finalScore += (beforeDiff - afterDiff);

      if (numAllies > 0) {
        const avgHardEng = (allyHard + allyEng) / numAllies;
        if (avgHardEng < 4) {
          const bonusMult = 3 - avgHardEng + numAllies;
          const add = ((flatCand.hardCC || 0) * bonusMult) + ((flatCand.engage || 0) * bonusMult);
          finalScore += add;
        }
      }
    }

    //
    //  SYNERGIES: for DamageType, Survivability, Utility, Scaling -> pick top 2 (with ties) and for each recorded high attribute,
    //    find synergies from SYNERGY_MAPPING and add:
    //    add (teamAvgForAttr + numAllies + candidateValueForThatAttr)
    //
    function addSynergyScoresForCategory(categoryTopInfo) {
      // collect recorded high scoring attributes: firstTop (all ties) plus secondTop (all ties)
      const recorded = [...categoryTopInfo.firstTop];
      // include secondTop if it exists
      if(recorded.length == 1) {
        categoryTopInfo.secondTop.forEach(a => { if (!recorded.includes(a)) recorded.push(a); });
      }

      recorded.forEach(attr => {
        const synergies = SYNERGY_MAPPING[attr] || [];
        synergies.forEach(sy => {
          const teamAvg = numAllies > 0 ? teamAvgAttribute(allyChampions, attr) : 0;
          const candVal = candidateAttrValue(flatCand, sy);
          // per your formula: (sum of attr in team/#allies) + #allies + candidate's score for the sy attribute
          finalScore += (teamAvg + numAllies + candVal);
        });
      });
    }

    addSynergyScoresForCategory(allyDamageTypeTop);
    addSynergyScoresForCategory(allySurvivabilityTop);
    addSynergyScoresForCategory(allyUtilityTop);
    addSynergyScoresForCategory(allyScalingTop);

    //
    //  COUNTERS to the enemy team: similar to synergy but use COUNTER_MAPPING of enemy high attributes.
    //    For each recorded enemy high attribute -> look up COUNTER_MAPPING[enemyAttr] -> for each counter attr 'c'
    //    add: (enemyAvgForAttr + numEnemies + candidateValueForCounterAttr)
    //
    function addCounterScoresFromEnemyCategory(enemyCategoryTopInfo) {
      const recorded = [...enemyCategoryTopInfo.firstTop];
      if(recorded.length == 1) {
        enemyCategoryTopInfo.secondTop.forEach(a => { if (!recorded.includes(a)) recorded.push(a); });
      }

      recorded.forEach(enemyAttr => {
        const counters = COUNTER_MAPPING[enemyAttr] || [];
        counters.forEach(counterAttr => {
          const enemyAvg = numEnemies > 0 ? teamAvgAttribute(enemyChampions, enemyAttr) : 0;
          const candVal = candidateAttrValue(flatCand, counterAttr);
          finalScore += (enemyAvg + numEnemies + candVal);
        });
      });
    }

    addCounterScoresFromEnemyCategory(enemyDamageTypeTop);
    addCounterScoresFromEnemyCategory(enemySurvivabilityTop);
    addCounterScoresFromEnemyCategory(enemyUtilityTop);
    addCounterScoresFromEnemyCategory(enemyScalingTop);

    //
    //  REVERSE COUNTERS: enemy's two lowest per category -> INVERSE_COUNTER_MAPPING lookup
    //    For each reverse counter attribute rc add: (4 - enemyAvgForAttr) + numEnemies + candidateValueForRc
    //
    function addReverseCounterScoresFromEnemyCategory(enemyCategoryBottomInfo) {
      const recorded = [...enemyCategoryBottomInfo.firstBottom];
      if(recorded.length == 1) {
        enemyCategoryBottomInfo.secondBottom.forEach(a => { if (!recorded.includes(a)) recorded.push(a); });
      }

      recorded.forEach(enemyLowAttr => {
        const reverseCounters = INVERSE_COUNTER_MAPPING[enemyLowAttr] || [];
        reverseCounters.forEach(rc => {
          const enemyAvg = numEnemies > 0 ? teamAvgAttribute(enemyChampions, enemyLowAttr) : 0;
          const candVal = candidateAttrValue(flatCand, rc);
          finalScore += ((4 - enemyAvg) + numEnemies + candVal);
        });
      });
    }

    const enemyDamageTypeBottom = getBottomTwoAttrsForCategory(enemyChampions, DAMAGETYPE_KEYS);
    const enemySurvivabilityBottom = getBottomTwoAttrsForCategory(enemyChampions, SURVIVABILITY_KEYS);
    const enemyUtilityBottom = getBottomTwoAttrsForCategory(enemyChampions, UTILITY_KEYS);
    const enemyScalingBottom = getBottomTwoAttrsForCategory(enemyChampions, SCALING_KEYS);

    addReverseCounterScoresFromEnemyCategory(enemyDamageTypeBottom);
    addReverseCounterScoresFromEnemyCategory(enemySurvivabilityBottom);
    addReverseCounterScoresFromEnemyCategory(enemyUtilityBottom);
    addReverseCounterScoresFromEnemyCategory(enemyScalingBottom);

    // final candidate score
    return {
      name: championName,
      final_score: Math.round(finalScore)
    };
  });

  // sort descending
  return scoredCandidates.sort((a, b) => b.final_score - a.final_score);
}

export {
  rankChampions
};