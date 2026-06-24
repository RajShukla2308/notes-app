

class Calculator{

    private value: number;
     
    constructor(initialValue = 0){
        this.value = initialValue;
    }

    sum(num: any){
        this.value += num
        return this;
    }


    substract(num : any){
        this.value -= num
        return this
    }

    multiply(num: any){
        this.value *= num;
        return this
    }

    divide(num: any){
        if(num == 0){
            console.log('cant divide by 0')
        }
        this.value /= num
        return this;
    }


    result(){
        return this.value
    }


}