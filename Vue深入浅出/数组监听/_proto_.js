/*
 * @Author: your name
 * @Date: 2020-11-28 13:15:38
 * @LastEditTime: 2020-11-28 13:45:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Learn_NeverStop/Vue深入浅出/数组监听/_proto_.js
 */
import {arrayMethods} from './arrayMethods';


//判断proto是否可用

const hasProto = '_proto_' in {}

console.log('hasProto :>> ', hasProto);


const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

console.log('arrayKeys :>> ', arrayKeys);

export class Observer{
    constructor(value){
        this.value = value
        if(Array.isArray(value)){
            //修改
            const augment = hasProto ? protoAugment :copyAugment

            augment(value,arrayMethods,arrayKeys)
        }else{
            // this.walk(value)
        }
    }
}

// 作用是覆盖原始array方法
function protoAugment(target,src,keys){
    target._proto_ = src
    
}

function copyAugment(target,src,keys){
   for (let i = 0; i < keys.length; i++) {
       const key = keys[i];
       def(target,key,src(key))
   }
}


const ob = new Observer([1,23,4 ])