// 私有公有成员分离

var calculator = (function(){

    //这里形成一个单独的私有空间
    //私有成员的作用
    //  1、将一个成员私有化
    //  2、抽象公共方法（其他成员中会用到的）

    //私有的转换逻辑
    /**
     * 这里是将开发中公共的逻辑抽离出来（数据处理的公共方法）注意：这里的方法是不用暴露的，它的存在是为了提供给“逻辑操作上的实现”中的函数进行调用！！！
     * @param {*} params 
     */
    function convert(params) {
        return parseInt(params);
    }


    /**
     * 这里存储的是所有的方法（逻辑操作上的实现）
     * @param {*} a 
     * @param {*} b 
     */
    function add(a,b) {
        return convert(a) + convert(b);
    }
    function subtract(a,b) {
        
    }
    function multiply(a,b) {
        
    }
    function divide(a,b) {
        
    }

    /**
     * 这里存储对外暴露的接口（以供其他模块调用）
     */
    return {
        add:add,
        subtract:subtract,
    }

})();


/**
 * 新增需求
 */
(function(calculator){
    //新添加的功能方法
    calculator.str = function (params) {
        
    }

    
    window.calculator = calculator;

})(window.calculator || {})
