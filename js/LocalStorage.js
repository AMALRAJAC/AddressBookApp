window.addEventListener('DOMContentLoaded',(event)=>{
    const fullName=document.querySelector('#fullName');
    const textError=document.querySelector('.text-error');
    fullName.addEventListener('input',function(){
        if(fullName.value.length==0){
            textError.textContent="Enter name";
            return;
           }  
         try{
            (new AddressBook()).fullName=fullName.value;
            textError.textContent="valid"
            
        }catch(e){
            textError.textContent=e;
        }
    });
    const phone=document.querySelector('#phone');
    const PhoneError=document.querySelector('.phone-error');
    phone.addEventListener('input',function(){
        if(phone.value.length==0){
            PhoneError.textContent="Enter phone number";
            return;
           }  
         try{
            (new AddressBook()).phone=phone.value;
            PhoneError.textContent="valid"
            
        }catch(e){
            PhoneError.textContent=e;
        }
    });

});

const save=()=>{
    try{
        let contactArrayList=createAddressBook();
        createAndUpdateStorage(contactArrayList);
    }catch(e){
        return;
    }
}
function createAndUpdateStorage(contactArrayList){
    let contactList=JSON.parse(localStorage.getItem("ContactArrayList"));
    if(contactList!=undefined){
        contactList.push(contactArrayList);
    }else{
        contactList=[contactArrayList]
    }
    alert(contactList.toString());
    localStorage.setItem("ContactArrayList",JSON.stringify(contactList));


}
const createAddressBook=()=>{

     let contactArrayList=new AddressBook();
    contactArrayList.fullName=getInputValueById('#fullName');
    contactArrayList.address=getInputValueById('#address');
    contactArrayList.state=getInputValueById('#state');
    contactArrayList.city=getInputValueById('#city');
    contactArrayList.zip=getInputValueById("#zip");
    contactArrayList.phone=getInputValueById('#phone');
return contactArrayList;
}
const getInputValueById=(id)=>{
    let value=document.querySelector(id).value;
    return value;
}
const resetForm=()=>{
    setValue('#fullName','');
    setValue('#address','');
    setValue('#state','');
    setValue('#city','');
    setValue('#zip','');
    setValue('#phone','');
}
const setValue=(id,value)=>{
    const element=document.querySelector(id);
    element.value=value;
}