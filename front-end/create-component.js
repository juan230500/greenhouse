var fs = require('fs');

var path;

if (process.argv[4])
    path = process.argv[4];
else {
    console.error('Expected path at position 4');
    process.exit(1);
}

var name;
if (process.argv[3])
    name = process.argv[3];
else {
    console.error('Expected name at position 3');
    process.exit(1);
}

var content;

if (process.argv[2] === '-f'){
    content = 
`import React from 'react';
import styles from './${name}.module.css';

const ${name} = props => {
    return (<p>component ${name}</p>);
};

export default ${name};`;

}
else if (process.argv[2] === '-c'){
    content = 
`import React,{Component} from 'react';
import styles from './${name}.module.css';

class ${name} extends Component {
    render () {
        return (<p>component ${name}</p>);
    }
};

export default ${name};`;
}
else {
    console.error('Expected -f or -c at position 2');
    process.exit(1);
}

var dir = `${path}/${name}`;
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}


fs.writeFile(`${dir}/${name}.js`, content, function (err) {
    if (err) throw err;
    console.log('Saved js!');
  });

fs.writeFile(`${dir}/${name}.module.css`, '', function (err) {
    if (err) throw err;
    console.log('Saved css!');
  }); 

