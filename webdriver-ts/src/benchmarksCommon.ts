import { FrameworkData, config } from "./common.js";
import { vConfig } from "./volume-config.js";

const volume = vConfig.env.volume.toLocaleString()

export enum BenchmarkType {
  CPU,
  MEM,
  STARTUP_MAIN,
  STARTUP,
  SIZE_MAIN,
  SIZE,
}

export interface BenchmarkInfoBase {
  id: string;
  label: string;
  description(throttleCPU: number | undefined): string;
  type: BenchmarkType;
}

export interface CPUBenchmarkInfo extends BenchmarkInfoBase {
  allowBatching: boolean;
  type: BenchmarkType.CPU;
  layoutEventRequired: boolean;
  additionalNumberOfRuns: number;
}

export interface MemBenchmarkInfo extends BenchmarkInfoBase {
  type: BenchmarkType.MEM;
}

export interface SizeInfoJSON {
  size_uncompressed: number,
  size_compressed: number,
  fp: number,
  fcp: number,
}

export interface SizeBenchmarkInfo extends BenchmarkInfoBase {
  type: BenchmarkType.SIZE;
  fn(sizeInfo: SizeInfoJSON): number;
}

export interface SizeMainBenchmarkInfo extends BenchmarkInfoBase {
  type: BenchmarkType.SIZE_MAIN;
}
export interface StartupMainBenchmarkInfo extends BenchmarkInfoBase {
  type: BenchmarkType.STARTUP_MAIN;
}

export interface StartupBenchmarkInfo extends BenchmarkInfoBase {
  type: BenchmarkType.STARTUP;
  property: string;
  fn: (x: number) => number;
}

export type BenchmarkInfo = CPUBenchmarkInfo | MemBenchmarkInfo | StartupMainBenchmarkInfo | StartupBenchmarkInfo | SizeBenchmarkInfo | SizeMainBenchmarkInfo;

export interface BenchmarkImpl {
  benchmarkInfo: BenchmarkInfo;
  type: BenchmarkType;
}

export interface CPUBenchmarkResult {
  total: number;
  script: number;
  paint: number;
}

export function fileName(framework: FrameworkData, benchmark: BenchmarkInfo) {
  return `${framework.fullNameWithKeyedAndVersion}_${benchmark.id}.json`;
}

export enum Benchmark {
  _01 = "01_create",
  _02 = "02_replace",
  _03 = "03_update10th",
  _04 = "04_select",
  _05 = "05_swap",
  _06 = "06_remove-one",
  _07 = "07_create-after1k",
  _08 = "08_clear",
  _21 = "21_ready-memory",
  _22 = "22_run-memory",
  _23 = "23_update5-memory",
  _24 = "24_run-clear-memory",
  _30 = "30_startup",
  _40 = "40_sizes",
}

export type BenchmarkId =
  | typeof Benchmark._01
  | typeof Benchmark._02
  | typeof Benchmark._03
  | typeof Benchmark._04
  | typeof Benchmark._05
  | typeof Benchmark._06
  | typeof Benchmark._07
  | typeof Benchmark._08
  // | typeof Benchmark._09
  | typeof Benchmark._30
  | typeof Benchmark._40;

const throttlingFactors: { [idx: string]: number } = {
  [Benchmark._03]: 4,
  [Benchmark._04]: 4,
  [Benchmark._05]: 4,
  [Benchmark._06]: 2,
  // [Benchmark._09]: 4,
};

export function slowDownNote(throttleCPU: number | undefined): string {
  return throttleCPU ? ` ${throttleCPU} x CPU slowdown.` : "";
}

export function slowDownFactor(benchmarkId: string, allowThrottling: boolean): number | undefined {
  if (!allowThrottling) return undefined;
  return throttlingFactors[benchmarkId];
}

export const cpuBenchmarkInfosArray: Array<CPUBenchmarkInfo> = [
  {
    id: Benchmark._01,
    label: "create rows",
    description: (throttleCPU: number | undefined) =>
      "creating " + volume + " rows (" + config.WARMUP_COUNT + " warmup runs)." + slowDownNote(throttleCPU),
    type: BenchmarkType.CPU,
    allowBatching: true,
    layoutEventRequired: true,
    additionalNumberOfRuns: 0,
  },
  {
    id: Benchmark._02,
    label: "replace all rows",
    description: (throttleCPU: number | undefined) =>
      "updating all " + volume + " rows (" + config.WARMUP_COUNT + " warmup runs)." + slowDownNote(throttleCPU),
    type: BenchmarkType.CPU,
    allowBatching: true,
    layoutEventRequired: true,
    additionalNumberOfRuns: 0,
  },
  {
    id: Benchmark._03,
    label: "partial update",
    description: (throttleCPU: number | undefined) =>
      "updating every 10th row for " + volume + " rows (" + config.WARMUP_COUNT + " warmup runs)." + slowDownNote(throttleCPU),
    type: BenchmarkType.CPU,
    allowBatching: true,
    layoutEventRequired: true,
    additionalNumberOfRuns: 0,
  },
  {
    id: Benchmark._04,
    label: "select row",
    description: (throttleCPU: number | undefined) =>
      "highlighting a selected row. (" + config.WARMUP_COUNT + " warmup runs)." + slowDownNote(throttleCPU),
    type: BenchmarkType.CPU,
    allowBatching: true,
    layoutEventRequired: true,
    additionalNumberOfRuns: 0,
  },
  {
    id: Benchmark._05,
    label: "swap rows",
    description: (throttleCPU: number | undefined) =>
      "swap 2 rows for table with " + volume + " rows. (" + config.WARMUP_COUNT + " warmup runs)." + slowDownNote(throttleCPU),
    type: BenchmarkType.CPU,
    allowBatching: true,
    layoutEventRequired: true,
    additionalNumberOfRuns: 0,
  },
  {
    id: Benchmark._06,
    label: "remove row",
    description: (throttleCPU: number | undefined) =>
      "removing one row. (" + config.WARMUP_COUNT + " warmup runs)." + slowDownNote(throttleCPU),
    type: BenchmarkType.CPU,
    allowBatching: true,
    layoutEventRequired: true,
    additionalNumberOfRuns: 0,
  },
  {
    id: Benchmark._07,
    label: "append rows to large table",
    description: (throttleCPU: number | undefined) =>
      "appending " + volume + " to a table of 1,000 rows." + slowDownNote(throttleCPU),
    type: BenchmarkType.CPU,
    allowBatching: true,
    layoutEventRequired: true,
    additionalNumberOfRuns: 0,
  },
  {
    id: Benchmark._08,
    label: "clear rows",
    description: (throttleCPU: number | undefined) =>
      "clearing a table with " + volume + " rows." + slowDownNote(throttleCPU) + " (" + config.WARMUP_COUNT + " warmup runs).",
    type: BenchmarkType.CPU,
    allowBatching: true,
    layoutEventRequired: true,
    additionalNumberOfRuns: 0,
  },
];

export const memBenchmarkInfosArray: Array<MemBenchmarkInfo> = [
  {
    id: Benchmark._21,
    label: "ready memory",
    description: () => "Memory usage after page load.",
    type: BenchmarkType.MEM,
  },
  {
    id: Benchmark._22,
    label: "run memory",
    description: () => `Memory usage after adding ${volume} rows.`,
    type: BenchmarkType.MEM,
  },
  {
    id: Benchmark._23,
    label: `update every 10th row for ${volume.slice(0,2)}k rows (5 cycles)`,
    description: () => "Memory usage after clicking update every 10th row 5 times",
    type: BenchmarkType.MEM,
  },
  {
    id: Benchmark._24,
    label: `creating/clearing ${volume.slice(0,2)}k rows (5 cycles)`,
    description: () => `Memory usage after creating and clearing ${volume} rows 5 times`,
    type: BenchmarkType.MEM,
  },
];

export const startupBenchmarkInfosArray: Array<StartupMainBenchmarkInfo> = [
  {
    id: Benchmark._30,
    type: BenchmarkType.STARTUP_MAIN,
    label: "",
    description: () => "",
  }
];

export const sizesBenchmarkInfosArray: Array<SizeMainBenchmarkInfo> = [
  {
    id: Benchmark._40,
    type: BenchmarkType.SIZE_MAIN,
    label: "",
    description: () => "",
  },
];

export const cpuBenchmarkInfos: { [idx: string]: CPUBenchmarkInfo } = {};
for (let bi of cpuBenchmarkInfosArray) {
  cpuBenchmarkInfos[bi.id] = bi;
}

export const memBenchmarkInfos: { [idx: string]: MemBenchmarkInfo } = {};
for (let bi of memBenchmarkInfosArray) {
  memBenchmarkInfos[bi.id] = bi;
}

export const startupBenchmarkInfos: { [idx: string]: StartupMainBenchmarkInfo } = {};
for (let bi of startupBenchmarkInfosArray) {
  startupBenchmarkInfos[bi.id] = bi;
}

export const sizeBenchmarkInfos: { [idx: string]: SizeMainBenchmarkInfo } = {};
for (let bi of sizesBenchmarkInfosArray) {
  sizeBenchmarkInfos[bi.id] = bi;
}

export const benchmarkInfos = [...cpuBenchmarkInfosArray, ...memBenchmarkInfosArray, ...startupBenchmarkInfosArray, ...sizesBenchmarkInfosArray];
