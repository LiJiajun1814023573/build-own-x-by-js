/**
 * tokenizer
 * lexical analysis
 * 实现词法分析
 * take string of code and break it down into an array of tokens
 * 将字符串分割成tokens串，便于后续语法分析生成AST树
 * @params input type:String 待处理的字符串
 * 
 * tokenizer需要处理几种类型,(,),空格，"String"(字符串),number（数字）,name（函数名）
 */
const tokenizer = ( input ) => {

  let current = 0;

  let tokens = [];

  while(current < input.length){
    let char = input[current];

    if (char === '('){
      tokens.push({
        type: 'paren',
        value: '('
      });
      current++;
      continue;
    };

    if (char === ')'){
      tokens.push({
        type: 'paren',
        value: ')'
      });
      current++;
      continue;
    }

    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)){
      current++;
      continue;
    };

    let NUMBER = /[0-9]/;
    if (NUMBER.test(char)){
      let value = '';
      while(NUMBER.test(char)){
        value += char;
        char = input[++current];
      };

      tokens.push({
        type: 'number',
        value
      });

      continue;
    }

    if (char === '"'){
      let value = '';
      char = input[++current];

      while(char !== '"'){
        value += char;
        char = input[++current];
      }
      current++;

      tokens.push({ 
        type: 'string',
        value
      })

      continue;
    }

    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)){
      let value = '';

      while(LETTERS.test(char)){
        value += char;
        char = input[current++];
      }

      tokens.push({
        type: 'name',
        value
      });
      
      continue;
    }

    throw new Error("don't know this charactor, sorry" + char);
  }
  return tokens;

}

export default tokenizer;