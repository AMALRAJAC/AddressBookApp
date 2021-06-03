let isUpdate=false;
 let contactObj={};
window.addEventListener('DOMContentLoaded',(event)=>{
    const fullName=document.querySelector('#fullName');
    fullName.addEventListener('input',function(){
        if(fullName.value.length==0){
            setTextValue('.text-error',"");
            return;
           }  
         try{
             checkName(fullName.value);
            setTextValue('.text-error',"");
            
        }catch(e){
            setTextValue('.text-error',e);
        }
    });
    const phone=document.querySelector('#phone');
    phone.addEventListener('input',function(){
        if(phone.value.length==0){
            setTextValue('.text-error',"");
            return;
           }  
         try{
            checkPhone(phone.value);
            setTextValue('.text-error',"");
            
        }catch(e){
            setTextValue('.text-error',e);
        }
    });
    document.querySelector('#cancelButton').href=site_properties.home_page;
    checkForUpdate();

});
const setTextValue=(id,value)=>{
    const element=document.querySelector(id);
    element.textContent=value;
}

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
const checkName=(fullName)=>{
    let nameRegex=RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if(!nameRegex.test(fullName)) throw 'incorrect';
}
const checkPhone=(phone)=>{
    let phoneRegex=RegExp('^([0-9]{2})+\\s+[0-9]{10}$');
    if(!phoneRegex.test(phone)) throw 'incorrect';
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
    event.preventDefault();
    event.stopPropagation();
    try{
             setContactObject();
             if(site_properties.use_local_storage.match("true")){
                 createAndUpdateStorage();
                 resetForm();
                 window.location.replace(site_properties.home_page);
             }else{
                 createOrUpdateContact();
             }
           }catch(e){
                return;
            }

}
const createOrUpdateContact=()=>{
    let postURL=site_properties.server_url;
    let methodCall="POST";
    if(isUpdate){
        methodCall="PUT";
        postURL=postURL+contactObj.id.toString();
    }
    makeServiceCall(methodCall,postURL,true,contactObj)
    .then(responseText=>{
        resetForm();
        window.location.replace(site_properties.home_page);
    })
    .catch(error=>{
        throw error;
    });
}
const setContactObject=()=>{
    if(!isUpdate)contactObj.id=createContactId();
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
        let contactArray=contactList.find(contact=>contact.id==contactObj.id);
        console.log(contactArray);
        if(!contactArray){
            contactList.push(contactObj);
        }else{
        const index=contactList.map(contact=>contact.id).indexOf(contactArray.id);
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
     let contactId=localStorage.getItem("contactId");
     contactId=!contactId? 1 :(parseInt(contactId)+1).toString();
     localStorage.setItem("contactId",contactId);
     return contactId;
 }
