<script setup>
import { ref, shallowRef } from 'vue'
import { buildData } from './data'
import { vConfig } from "../../../../webdriver-ts/src/volume-config.ts";

const selected = ref()
const rows = shallowRef([])
const volume = vConfig.env.volume

function setRows(update = rows.value.slice()) {
  rows.value = update
}

function add() {
  rows.value = rows.value.concat(buildData(volume))
}

function remove(id) {
  rows.value.splice(
    rows.value.findIndex((d) => d.id === id),
    1
  )
  setRows()
}

function select(id) {
  selected.value = id
}

function run() {
  setRows(buildData())
  selected.value = undefined
}

function update() {
  const _rows = rows.value
  for (let i = 0; i < _rows.length; i += 10) {
    _rows[i].label += ' !!!'
  }
  setRows()
}

function runLots() {
  setRows(buildData(volume))
  selected.value = undefined
}

function clear() {
  setRows([])
  selected.value = undefined
}

function swapRows() {
  const _rows = rows.value
  if (_rows.length > 998) {
    const d1 = _rows[1]
    const d2last = _rows[_rows.length-2]
    _rows[1] = d2last
    _rows[_rows.length-2] = d1
    setRows()
  }
}
</script>

<template>
  <div class="jumbotron">
    <h1 class="title fw-bold">Test Case Framework</h1>
    <p class="desc">“<span class="fw-bold">VueJS</span> is ready to test”</p>
    <div class="test-case-wrapper">
        <button type="button" class="btn" id="run" @click="run">Create 1,000 rows</button>
        <button type="button" class="btn" id="runlots" @click="runLots">Create {{ volume.toLocaleString() }} rows</button>
        <button type="button" class="btn" id="add" @click="add">Append {{ volume.toLocaleString() }} rows</button>
        <button type="button" class="btn" id="update" @click="update">Update every 10th row</button>
        <button type="button" class="btn" id="swaprows" @click="swapRows">Swap Rows</button>
        <button type="button" class="btn" id="clear" @click="clear">Clear</button>
    </div>
  </div>
  <div class="table-wrapper" v-if="rows.length > 0">
    <table class="table table-hover table-striped test-data">
      <tbody>
        <tr
          v-for="{ id, label } of rows"
          :key="id"
          :class="{ danger: id === selected }"
          :data-label="label"
          v-memo="[label, id === selected]"
        >
          <td>{{ id }}</td>
          <td>
            <a @click="select(id)">{{ label }}</a>
          </td>
          <td>
            <a @click="remove(id)">
              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="11" viewBox="0 0 352 512"><path d="M242.7 256l100.1-100.1c12.3-12.3 12.3-32.2 0-44.5l-22.2-22.2c-12.3-12.3-32.2-12.3-44.5 0L176 189.3 75.9 89.2c-12.3-12.3-32.2-12.3-44.5 0L9.2 111.5c-12.3 12.3-12.3 32.2 0 44.5L109.3 256 9.2 356.1c-12.3 12.3-12.3 32.2 0 44.5l22.2 22.2c12.3 12.3 32.2 12.3 44.5 0L176 322.7l100.1 100.1c12.3 12.3 32.2 12.3 44.5 0l22.2-22.2c12.3-12.3 12.3-32.2 0-44.5L242.7 256z"/></svg>
            </a>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
