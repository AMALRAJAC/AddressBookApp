class AddressBook{
    //getters and setters
    get id(){
        return this._id;
    }
    set id(id){
        this._id=id;
    }
    get fullName(){
        return this._fullName;
    }
    set fullName(fullName){
        let nameRegex=RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if(nameRegex.test(fullName)){
            this._fullName=fullName;
        }else{
            throw 'Name is incorrect';
        }
        
    }
    get address(){
        return this._address;
    }
    set address(address){
        this._address=address;
    }
    get state(){
        return this._state;
    }
    set state(state){
        this._state=state;
    }
    get city(){
        return this._city;
    }
    set city(city){
        this._city=city;
    }
    get zip(){
        return this._zip;
    }
    set zip(zip){
        this._zip=zip;
    }
    get phone(){
        return this._phone;
    }
    set phone(phone){
        let telRegex=RegExp('^([0-9]{2})+\\s+[0-9]{10}$');
        if(telRegex.test(phone)){
            this._phone=phone;
        }else{
            throw 'Phone number is incorrect';
        }
       // this._phone=phone;
    }
    //method
    toString(){
        return "id="+Math.floor(Math.random()*100)+",FullName="+this.fullName+",Address"+this.address+",state="+this.state+",city="+this.city+",zip="+this.zip+",phone="+this.phone;
    }


}