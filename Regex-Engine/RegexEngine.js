/**
 * matchOne
 * @param pattern 模式字符
 * @param text 待匹配字符
 */
const matchOne = (pattern, text) => {
  if ( !pattern ) return true;
  if ( !text ) return false;
  if ( pattern === '.') return true;
  return pattern === text;
}

/**
 * match
 * 匹配模式字符串与文本字符串
 * @param pattern 模式字符串
 * @param text 待匹配字符串
 * match函数采用递归的方式完成
 * match函数有几个判断分支
 * 1. 如果pattern为空，直接返回true
 * 2. 如果出现? 则调用matchQuestion方法判断是否match
 * 3. 如果出现* 则调用matchStar方法判断是否match
 * 4. 除此之外, 如果当前字符匹配成功,则继续从下一字符开始匹配
 */
const match = (pattern, text) => {
  if ( pattern === '') return true;
  if ( pattern === '$' && text === '') return true;
  if ( pattern[1] === '?') return matchQuestion(pattern, text);
  else if (pattern[1] === '*') return matchStar(pattern, text);
  else {
    return (
      matchOne(pattern[0], text[0]) && match(pattern.slice(1), text.slice(1));
    )
  }
}

/**
 * matchQuesion
 * 解决?
 * 有两种匹配成功的情况
 * 1.当前字符匹配成功，则使用?之后的模式字符串与之后的字符串继续匹配
 * 2.当前字符匹配失败，直接使用?之后的模式字符串重新匹配text字符串
 */
const matchQuestion = (pattern, text) => {
  return (
    matchOne(pattern[0] === text[0]) && match(pattern.slice(2), text.slice(1))) || 
  match(pattern.slice(2), text );
}


/**
 * matchStar
 * 解决*的问题
 * 关键在于如果当前字符匹配成功，则仍然使用该模式字符串继续匹配之后的文本字符串
 * 否则使用模式字符串*之后的部分开始匹配。
 * 值得注意的是：该操作达到了贪婪匹配的目的,即尽可能匹配多的字符串，若失败则回退操作。
 */

const matchStar = (pattern, text) => {
  return (
    matchOne(pattern[0] === text[0]) && match(pattern, text.slice(1)) ||
  match(pattern.slice(2), text));
}

/**
 * search
 * 对match方法进行完备性的补充,真正达到实现匹配的目的
 * 即如果不是以^开头，则添加.*达到匹配的效果目的。
 */

 const search = (pattern, text) => {
   if(pattern[0] === '^') return match(pattern.slice(1), text);
   else return match('.*' + pattern, text);
 }