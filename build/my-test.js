const path = require('path');
const fs = require('fs');
const componentsPath = path.resolve(__dirname, '../src/components/')
const data = fs.readdirSync(componentsPath);
const indexPath = path.resolve(__dirname, '../src/index.js')



function invert(dir) {
    const name = dir
        .split('-')
        .map((item) => item.replace(/\S/, (s) => s.toUpperCase()))
        .join('')
    let fullName = `$SUN${name}`
    let path = `./components/${dir}/index.vue`
    return {
        name: fullName,
        path
    }
}

function generateImport(components) {
    let str = '';
    components.forEach((cpt) => str += `import ${cpt.name} from '${cpt.path}';\n`)
    return str;
}

function generateExport(components) {
    let str = 'export { \n';
    components.forEach((cpt) => str += `\t${cpt.name},\n`);
    str += '};\n'
    return str;
}

function generateArray(components) {
    let str = 'const components = [\n';
    components.forEach((cpt) => str += `\t${cpt.name},\n`);
    str += '];\n'
    return str;
}


function writeIndexFile(importStr, exportStr, arrayStr) {
    fs.writeFileSync(indexPath,
        `
const install = function (Vue) {
    components.forEach((comp, index) => {
        if (comp.extendOptions) {
            let options = comp.options || {}
            const name = comp.extendOptions.name
            if (/^[a-z]/.test(name)) {
                options.name = comp.options ? comp.options.components[name].superOptions.name : name
            }
            Vue.component(options.name, options)
        } else {
            Vue.component(comp.name, comp)
        }
    })
}

export default install;`, { encoding: 'utf8' });
    console.log('generator index.js success')
}


const allTypeData = data.map(invert);


console.log(generateImport(allTypeData))
console.log(generateExport(allTypeData), '----')
console.log(generateArray(allTypeData))
