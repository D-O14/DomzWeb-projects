import ".textarea.css";

export function TextArea(config = {}) {
    return parseHTML(`
  <textarea ${ config.className ? `class="${ config.className }"` : "" } ${ config.id ? `id="${ config.id }"` : "" } 
  ${ config.rows ? `rows="${ config.rows }"` : "" }${ config.columns ? `columns="${ config.columns }"` : "" } 
  ${ config.placeholder ? `placeholder="${ config.placeholder }"` : "" }></textarea>
  <!--<span class="char-count" id="charCount"></span>-->`);
};