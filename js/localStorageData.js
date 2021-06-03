
window.addEventListener('DOMContentLoaded',(event)=>{
    contactList=getContactArrayListFromStorage();
    document.querySelector(".emp-count").textContent=contactList.length;
    createInnerHtml();
    localStorage.removeItem('edit');
});
const getContactArrayListFromStorage=()=>{
    return localStorage.getItem('ContactArrayList')?
            JSON.parse(localStorage.getItem('ContactArrayList')):[];

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
        <img class="image" id="${contact._id}" onclick="remove(this)"
        src="images/delete.png" alt="delete">
        <img class="image" id="${contact._id}" onclick="update(this)"
        src="images/edit.png" alt="edit">
        </td>
        </tr>`;
    }
    document.querySelector('#table-display').innerHTML=innerHtml;
    
}

const remove=(node)=>{
    contactList=getContactArrayListFromStorage();
    let contactArray=contactList.find(contact=>contact._id==node._id);
    console.log(contactArray);
    if(!contactArray) return;
    const index=contactList.map(contact=>contact._id).indexOf(contactArray._id);
    contactList.splice(index,1);
    localStorage.setItem("ContactArrayList",JSON.stringify(contactList));
    document.querySelector(".emp-count").textContent=contactList.length;
    createInnerHtml();
}
const update=(node)=>{
    contactList=getContactArrayListFromStorage();
    let contactArray=contactList.find(contact=>contact._id==node._id);
    console.log(contactArray);
    if(!contactArray) return;
    localStorage.setItem('edit',JSON.stringify(contactArray))
    window.location.replace(site_properties.add_emp_payroll_page);
}