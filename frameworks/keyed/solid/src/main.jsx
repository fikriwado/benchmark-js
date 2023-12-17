import { createSignal, createSelector, Show, batch } from 'solid-js';
import { render } from 'solid-js/web';
import { vConfig } from "../../../../webdriver-ts/src/volume-config.ts";

let idCounter = 1;
const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"],
  colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"],
  nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];

function _random (max) { return Math.round(Math.random() * 1000) % max; };

function buildData(count) {
  let data = new Array(count);
  for (let i = 0; i < count; i++) {
    const [label, setLabel] = createSignal(`${adjectives[_random(adjectives.length)]} ${colours[_random(colours.length)]} ${nouns[_random(nouns.length)]}`);
    data[i] = {
      id: idCounter++,
      label, setLabel
    }
  }
  return data;
}

const Button = ({ id, text, fn }) =>
  <button id={ id } class='btn' type='button' onClick={ fn }>{ text }</button>

const volume = vConfig.env.volume

const App = () => {
  const [data, setData] = createSignal([]),
    [selected, setSelected] = createSignal(null),
    run = () => setData(buildData(1000)),
    runLots = () => setData(buildData(volume)),
    add = () => setData(d => [...d, ...buildData(volume)]),
    update = () => batch(() => {
      for(let i = 0, d = data(), len = d.length; i < len; i += 10)
        d[i].setLabel(l => l + ' !!!');
    }),
    swapRows = () => {
      const d = data().slice();
      if (d.length > 998) {
        let tmp = d[1];
        d[1] = d[d.length-2];
        d[d.length-2] = tmp;
        setData(d);
      }
    },
    clear = () => setData([]),
    remove = id => setData(d => {
      const idx = d.findIndex(d => d.id === id);
      return [...d.slice(0, idx), ...d.slice(idx + 1)];
    }),
    isSelected = createSelector(selected);

  return (
    <>
      <div class='jumbotron'>
        <h1 class="title fw-bold">Test Case Framework</h1>
        <p class="desc">“<span class="fw-bold">SolidJS</span> is ready to test”</p>
        <div class="test-case-wrapper">
          <Button id='run' text='Create 1,000 rows' fn={ run } />
          <Button id='runlots' text={`Create ${volume.toLocaleString()} rows`} fn={ runLots } />
          <Button id='add' text={`Append ${volume.toLocaleString()} rows`} fn={ add } />
          <Button id='update' text='Update every 10th row' fn={ update } />
          <Button id='swaprows' text='Swap Rows' fn={ swapRows } />
          <Button id='clear' text='Clear' fn={ clear } />
        </div>
      </div>
      <Show when={data().length > 0}>
        <div class="table-wrapper">
          <table class='table'>
            <tbody>
              <For each={ data() }>{ row => {
                let rowId = row.id;
                return <tr class={isSelected(rowId) ? "danger": ""}>
                  <td textContent={ rowId } />
                  <td><a onClick={[setSelected, rowId]} textContent={ row.label() } /></td>
                  <td>
                    <a onClick={[remove, rowId]}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="16" width="11" viewBox="0 0 352 512"><path d="M242.7 256l100.1-100.1c12.3-12.3 12.3-32.2 0-44.5l-22.2-22.2c-12.3-12.3-32.2-12.3-44.5 0L176 189.3 75.9 89.2c-12.3-12.3-32.2-12.3-44.5 0L9.2 111.5c-12.3 12.3-12.3 32.2 0 44.5L109.3 256 9.2 356.1c-12.3 12.3-12.3 32.2 0 44.5l22.2 22.2c12.3 12.3 32.2 12.3 44.5 0L176 322.7l100.1 100.1c12.3 12.3 32.2 12.3 44.5 0l22.2-22.2c12.3-12.3 12.3-32.2 0-44.5L242.7 256z"/></svg>
                    </a>
                  </td>
                  <td/>
                </tr>
              }}</For>
            </tbody>
          </table>
        </div>
      </Show>
    </>
  );
}

render(App, document.getElementById("main"));
