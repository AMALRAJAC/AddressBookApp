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
    checkForUpdate();

});

// const save=()=>{
//     try{
//         let contactArrayList=createAddressBook();
//         createAndUpdateStorage(contactArrayList);
//     }catch(e){
//         return;
//     }
// }
function createAndUpdateLocalStorage(contactArrayList){
    let contactList=JSON.parse(localStorage.getItem("ContactArrayList"));
    if(contactList!=undefined){
        contactList.push(contactArrayList);
    }else{
        contactList=[contactArrayList]
    }
    alert(contactList.toString());
    localStorage.setItem("ContactArrayList",JSON.stringify(contactList));


}
const createNewAddressBook=()=>{

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
const checkForUpdate=()=>{
    contactJSON=localStorage.getItem('edit');
    isUpdate=contactJSON? true:false;
    if(!isUpdate) return;
    contactObj=JSON.parse(contactJSON);
    setForm();
}
const setForm=()=>{
    setValue('#fullName',contactObj._fullName);
    setValue('#address',contactObj._address);
    setValue('#state',contactObj._state);
    setValue('#city',contactObj._city);
    setValue('#zip',contactObj._zip);
    setValue('#phone',contactObj._phone);
}
const save=(event)=>{
    try{
               let contactArrayList=createNewAddressBook();
               createAndUpdateLocalStorage(contactArrayList);
           }catch(e){
                return;
            }

    try{
        setContactObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }catch(e){
        return;
    
}
}
const setContactObject=()=>{
    contactObj._fullName=getInputValueById('#fullName');
    contactObj._address=getInputValueById('#address');
    contactObj._state=getInputValueById('#state');
    contactObj._city=getInputValueById('#city');
    contactObj._zip=getInputValueById("#zip");
    contactObj._phone=getInputValueById('#phone');
}
 const createAndUpdateStorage=()=>{
     let contactList=JSON.parse(localStorage.getItem("ContactArrayList"));
     if(contactList){
        let contactArray=contactList.find(contact=>contact._id==contactObj._id);
        console.log(contactArray);
        if(!contactArray){
            contactList.push(createAddressBook());
        }else{
        const index=contactList.map(contact=>contact._id).indexOf(contactArray._id);
        contactList.splice(index,1);
        }
     }else{
         contactList=[createAddressBook()]
     }
     localStorage.setItem("ContactArrayList",JSON.stringify(contactList))
 }
 const createAddressBook=(id)=>{
     let contactData=new AddressBook();
     if(!id) contactData.id=createContactId();
     else contactData.id=id;
     setContactData(contactData)
     return contactData;
 }
 const setContactData=(contactData)=>{
     try{
         contactData.fullName=contactObj._fullName;
     }catch(e){
            setTextValue('.text-error',e);
            throw e;
     }
     contactData.address=contactObj._address;
     contactData.state=contactObj._state;
     contactData.city=contactObj._city;
     contactData.zip=contactObj._zip;
     contactData.phone=contactObj._phone;
     alert(contactData.toString());
 }
 const createContactId=()=>{
     let contactId=localStorage.getItem("ContactID");
     empID=!empID? 1 :(parseInt(empID)+1).toString();
     localStorage.setItem("ContactID",contactId);
     return contactId;
 }
