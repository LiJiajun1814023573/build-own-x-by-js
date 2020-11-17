/**
 * traverser
 * @param ast
 * traverser the ast
 */

 const traverser = ( ast, visitor ) => {
   
  const traverseArray = ( arr, parent ) => {
    arr.forEach( child  => {
      traverseNode( child, parent );
    });
  }

  const traverseNode = ( node, parent ) => {
    let methods = visitor[node.type]

    if ( methods && methods.enter ){
      methods.enter(node, parent);
    }

    switch( node.type ){

      case 'Program':
        traverseArray(node.body, node);
        break;
      case 'CallExpression':
        traverseArray(node.params, node);
        break;
      case 'NumberLiteral':
        break;
      case 'StringLiteral':
        break;
      default:
        thorw new TypeError(node.type); 
    }

    if ( methods && methods.exit){
      methods.exit(node, parent);
    }
  }

  traverseNode(ast, null);
 }


export default traverser;