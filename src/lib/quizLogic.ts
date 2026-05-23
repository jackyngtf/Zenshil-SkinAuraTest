import questions from '../data/questions.json';
import auraProfiles from '../data/aura_profiles.json';

export type AuraType = keyof typeof auraProfiles;

export function calculateResult(answers: Record<string, string>) {
  const auraScores: Record<string, number> = {
    overworked: 0,
    stress: 0,
    hidden_aging: 0,
    recovery: 0,
    preventive: 0,
    glow: 0,
    burnout: 0,
    late_night: 0
  };

  questions.forEach((q) => {
    const selectedOptionId = answers[q.id];
    if (selectedOptionId) {
      const option = q.options.find(o => o.id === selectedOptionId);
      if (option && option.auraMapping) {
        auraScores[option.auraMapping]++;
      }
    }
  });

  // Tie-breaker priority: Burnout > Stress > Overworked > Late Night > Hidden Aging > Recovery > Glow > Preventive
  const priority = ['burnout', 'stress', 'overworked', 'late_night', 'hidden_aging', 'recovery', 'glow', 'preventive'];
  
  const sortedAuras = Object.entries(auraScores).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return priority.indexOf(a[0]) - priority.indexOf(b[0]);
  });

  const primaryAuraKey = sortedAuras[0][0] as AuraType;
  const secondaryAuraKey = sortedAuras[1][0] as AuraType;
  
  const primaryRawScore = sortedAuras[0][1];
  const secondaryRawScore = sortedAuras[1][1];

  // Primary: 70-92%
  const primaryPercentage = Math.floor(70 + (primaryRawScore / 10) * 22);
  // Secondary: 45-68%
  const secondaryPercentage = Math.floor(45 + (secondaryRawScore / 10) * 23);

  return {
    primaryAura: auraProfiles[primaryAuraKey],
    primaryPercentage,
    secondaryAura: auraProfiles[secondaryAuraKey],
    secondaryPercentage,
    calculatedStats: auraProfiles[primaryAuraKey].statsModifiers
  };
}
