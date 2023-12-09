import {RawResult} from './Common';

export const results: RawResult[]=[
{"f":"vue-v3.3.6-keyed","b":"01_run1k","v":{"total":[119.903,117.663,114.612,115.328,113.841,117.775,117.15,119.278,118.053,115.637,127.125,116.495,125.19,111.225,114.434],"script":[30.257,30.609,29.059,26.924,29.764,28.477,29.871,31.462,29.03,28.031,28.978,28.903,27.518,28.418,29.908],"paint":[88.275,85.259,84.3,87.166,82.529,87.88,85.891,86.466,87.398,85.881,96.18,86.045,95.799,81.308,82.848]}},];
export const frameworks = [{"name":"solid-v1.8.0-keyed","dir":"keyed/solid","keyed":true,"frameworkHomeURL":"https://www.solidjs.com/"},{"name":"vue-v3.3.6-keyed","dir":"keyed/vue","keyed":true,"frameworkHomeURL":"https://vue.js.org/"},{"name":"vanillajs-non-keyed","dir":"non-keyed/vanillajs","keyed":false,"issues":[772],"frameworkHomeURL":""},{"name":"vue-v3.3.6-non-keyed","dir":"non-keyed/vue","keyed":false,"frameworkHomeURL":"https://vue.js.org/"}];
export const benchmarks = [{"id":"01_run1k","label":"create rows","description":"creating 1,000 rows (5 warmup runs).","type":0},{"id":"02_replace1k","label":"replace all rows","description":"updating all 1,000 rows (5 warmup runs).","type":0},{"id":"03_update10th1k_x16","label":"partial update","description":"updating every 10th row for 1,000 rows (3 warmup runs). 4 x CPU slowdown.","type":0},{"id":"04_select1k","label":"select row","description":"highlighting a selected row. (5 warmup runs). 4 x CPU slowdown.","type":0},{"id":"05_swap1k","label":"swap rows","description":"swap 2 rows for table with 1,000 rows. (5 warmup runs). 4 x CPU slowdown.","type":0},{"id":"06_remove-one-1k","label":"remove row","description":"removing one row. (5 warmup runs). 2 x CPU slowdown.","type":0},{"id":"07_create10k","label":"create many rows","description":"creating 10,000 rows. (5 warmup runs with 1k rows).","type":0},{"id":"08_create1k-after1k_x2","label":"append rows to large table","description":"appending 1,000 to a table of 1,000 rows.","type":0},{"id":"09_clear1k_x8","label":"clear rows","description":"clearing a table with 1,000 rows. 4 x CPU slowdown. (5 warmup runs).","type":0},{"id":"21_ready-memory","label":"ready memory","description":"Memory usage after page load.","type":1},{"id":"22_run-memory","label":"run memory","description":"Memory usage after adding 1,000 rows.","type":1},{"id":"23_update5-memory","label":"update every 10th row for 1k rows (5 cycles)","description":"Memory usage after clicking update every 10th row 5 times","type":1},{"id":"25_run-clear-memory","label":"creating/clearing 1k rows (5 cycles)","description":"Memory usage after creating and clearing 1000 rows 5 times","type":1},{"id":"26_run-10k-memory","label":"run memory 10k","description":"Memory usage after adding 10,000 rows.","type":1},{"id":"31_startup-ci","label":"consistently interactive","description":"a pessimistic TTI - when the CPU and network are both definitely very idle. (no more CPU tasks over 50ms)","type":3},{"id":"32_startup-bt","label":"script bootup time","description":"the total ms required to parse/compile/evaluate all the page's scripts","type":3},{"id":"33_startup-mainthreadcost","label":"main thread work cost","description":"total amount of time spent doing work on the main thread. includes style/layout/etc.","type":3},{"id":"34_startup-totalbytes","label":"total kilobyte weight","description":"network transfer cost (post-compression) of all the resources loaded into the page.","type":3},{"id":"41_size-uncompressed","label":"uncompressed size","description":"uncompressed size of all implementation files (excluding /css and http headers)","type":5},{"id":"42_size-compressed","label":"compressed size","description":"brotli compressed size of all implementation files (excluding /css and http headers)","type":5},{"id":"43_first-paint","label":"first paint","description":"first paint","type":5},{"id":"44_first-contentful-paint","label":"first contentful paint","description":"first contentful paint","type":5}];
