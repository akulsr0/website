interface ILearning {
  slug: string;
  title: string;
  children: string[];
}

interface ILearningRecommended {
  prev?: string;
  next?: string;
}

export type { ILearning, ILearningRecommended };
