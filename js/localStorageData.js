
let contactList;
window.addEventListener('DOMContentLoaded',(event)=>{
    if(site_properties.use_local_storage.match("true")){
        getContactArrayListFromStorage();
    }else {
        getContactArrayListFromServer
    }
  
});
const processContactDataResponse=()=>{
    document.querySelector(".emp-count").textContent=contactList.length;
    createInnerHtml();
    localStorage.removeItem('edit');
}
const getContactArrayListFromStorage=()=>{
    contactList= localStorage.getItem('ContactArrayList')?
            JSON.parse(localStorage.getItem('ContactArrayList')):[];
    processContactDataResponse();

}
const getContactArrayListFromServer=()=>{
    makeServiceCall("GET",site_properties.server_url,true).then(responseText=>{
        contactList=JSON.parse(responseText);
        processContactDataResponse();
    })
    .catch(error=>{
        console.log("GET Error Status: "+JSON.stringify(error));
        contactList=[];
        processContactDataResponse();
    });

}


const createInnerHtml=()=>{
    const headerHtml="<th>FullName</th><th>Address</th><th>State</th><th>City</th>"+
    "<th>Zip</th><th>PhoneNumber</th><th>Action</th>";
    if(contactList.length==0) return;
    let innerHtml=`${headerHtml}`;
    for (const contact of contactList){
        innerHtml=`${innerHtml}
        <tr>
        <td>${contact._fullName}</td>
        <td>${contact._address}</td>
        <td>${contact._state}</td>
        <td>${contact._city}</td>
        <td>${contact._zip}</td>
        <td>${contact._phone}</td>
        <td>
        <img class="image" id="${contact.id}" onclick="remove(this)"
        src="images/delete.png" alt="delete">
        <img class="image" id="${contact.id}" onclick="update(this)"
        src="images/edit.png" alt="edit">
        </td>
        </tr>`;
    }
    document.querySelector('#table-display').innerHTML=innerHtml;
    
}

const remove=(node)=>{
    console.log(contactList);
    let contactArray=contactList.find(contact=>contact.id==node.id);
    console.log(contactArray);
    if(!contactArray) return;
    const index=contactList.map(contact=>contact.id).indexOf(contactArray.id);
    contactList.splice(index,1);
    if(site_properties.use_local_storage.match("true")){
        localStorage.setItem("ContactArrayList",JSON.stringify(contactList));
        createInnerHtml();
    }else{
        const deleteURL=site_properties.server_url+contactArray.id.toString();
        makeServiceCall("DELETE",deleteURL,false)
        .then(responseText=>{
            createInnerHtml();
        })
        .catch(error=>{
            console.log("DELETE Error Status: "+JSON.stringify(error));
        });
    }
}
const update=(node)=>{
    console.log(contactList);
    let contactArray=contactList.find(contact=>contact.id==node.id);
    console.log(contactArray);
    if(!contactArray) return;
    localStorage.setItem('edit',JSON.stringify(contactArray))
    window.location.replace(site_properties.add_emp_payroll_page);
}