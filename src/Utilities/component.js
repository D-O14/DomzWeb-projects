export function createTemplate(content){
    const template = document.createElement("template");
    template.innerHTML = content;
    return template;
};

export function createStyle(styleUrl, importUrl) {
    const style = document.createElement("link");
    style.rel = "preload";
    style.as = "style";
    style.onload = () => { style.rel = 'stylesheet' };
    style.href = new URL(styleUrl, importUrl);
    return style;
};