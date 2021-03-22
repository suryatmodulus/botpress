import { Intent, ListEntityModel, PatternEntity } from '../typings'
import Utterance from '../utterance/utterance'

export interface IntentTrainInput {
  languageCode: string
  list_entities: ListEntityModel[]
  pattern_entities: PatternEntity[]
  intents: Intent<Utterance>[]
  nluSeed: number
}

export interface IntentPrediction {
  name: string
  confidence: number
}
export interface IntentPredictions {
  extractor: string
  intents: IntentPrediction[]
}
export interface NoneableIntentPredictions extends IntentPredictions {
  oos: number
}

export interface IntentClassifier {
  train(trainInput: IntentTrainInput, progress: (p: number) => void): Promise<void>
  serialize(): string
  load(model: string): Promise<void>
  predict(utterance: Utterance): Promise<IntentPredictions>
}
export interface NoneableIntentClassifier extends IntentClassifier {
  predict(utterance: Utterance): Promise<NoneableIntentPredictions>
}
