const acorn = require("acorn")
const estraverse = require("estraverse");
const astring = require("astring");
const _i = {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "_i"
          },
          "init": {
            "type": "Literal",
            "value": 0,
            "raw": "0"
          }
        }
      ],
      "kind": "let"
};

let iplusplus = {
      "type": "ExpressionStatement",
      "expression": {
        "type": "UpdateExpression",
        "operator": "++",
        "prefix": false,
        "argument": {
          "type": "Identifier",
          "name": "_i"
        }
      }
};

let limit_break = {
            "type": "IfStatement",
            "test": {
              "type": "BinaryExpression",
              "left": {
                "type": "Identifier",
                "name": "_i"
              },
              "operator": ">",
              "right": {
                "type": "Literal",
                "value": 100,
                "raw": "100"
              }
            },
            "consequent": {
              "type": "BreakStatement",
 
              "label": null
            },
            "alternate": null
};

const source = `while(true) {}`;
console.log('Input: \n' + source + '\n');

console.log('Output: ');
let ast = acorn.parse(source, { ecmaVersion: "2020" });
ast = estraverse.replace(ast, {
    enter: function (node, parent) {
        if (node.type == 'Program') {
          let rlen = node.body.length;
	  for(let i = 0; i < rlen; i++) {
	    let child = node.body[i];
	    if(child.type == 'WhileStatement') {
	      node.body.splice(i - 1, 0, _i);
	      child.body.body.push(iplusplus);
	      child.body.body.unshift(limit_break);
	    }
	  }
	}
	return node;
    },
});

console.log(astring.generate(ast))
