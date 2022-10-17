const tblStudent =document.getElementById('tbl-students');
const btnNew =document.getElementById('btn-new');
const btnSave =document.getElementById('btn-save');
const btnClear =document.getElementById('btn-clear');
const txtId =document.getElementById('txt-id');
const txtName =document.getElementById('txt-name');
const txtContact =document.getElementById('txt-contact');
const txtAddress =document.getElementById('txt-address');
const frmStudent =document.getElementById('frm-student');




const regExp4Name = /^[A-Za-z ]+$/;
const regExp4Address = /^[A-Za-z0-9:.,/\- ]+$/;
const regExp4Contact = /^\d{3}-\d{7}$/;

const students=[];

let slectedStudent=null;

frmStudent.addEventListener('submit',(evetData)=>evetData.preventDefault());

class Student{
    id;
    #name;
    address;
    #contact;
    rowElm;
    #nameCell;
    #contactCell;
    get name(){
       return this.#name;
    }
    get contact(){
        return this.#contact;
    }

    set name(name){
        this.#name=name;
        this.#nameCell.innerText=name;
    }
    set contact(contact){
        this.#contact=contact;
        this.#contactCell.innerText=contact;
    }

    constructor(id,name,contact,address){
        
        
        this.rowElm=tblStudent.tBodies[0].insertRow();
        const idCell=this.rowElm.insertCell();
        this.#nameCell=this.rowElm.insertCell();
        this.#contactCell=this.rowElm.insertCell();
        const removeCell=this.rowElm.insertCell();
        removeCell.innerHTML='<i class="bi bi-trash"></i>';
        
        // nameCell.innerText=this.name;
        // contactCell.innerText=this.contact;
        
        
        
        this.id=id;
        idCell.innerText=this.id;
        this.name=name;
        this.contact=contact;
        this.address=address;
        // removeCell.querySelector("i").addEventListener('click',()=>this.rowElm.remove() );
        
        tblStudent.classList.remove('empty');

        this.rowElm.addEventListener('click',()=>{
            students.forEach(student => student.rowElm.classList.remove('selected'));
            this.rowElm.classList.add('selected');
            txtId.value=this.id;
            txtName.value=this.name;
            txtContact.value=this.contact;
            txtAddress.value=this.address;
            
            btnSave.innerText='Update Student';

            slectedStudent=this;
        });
    }
}



/* Remove items from table */

tblStudent.tBodies[0].addEventListener('click',({target:elm})=>{

    if(elm && elm.tagName==='i'.toUpperCase()  && elm.classList.contains('bi-trash')){
        const elmRow=elm.closest("tr");
        const index= students.findIndex(student => student.rowElm===elmRow);
        console.log(index);
        students.splice(index,1);
        elmRow.remove();
        btnNew.click();
        if( !tblStudent.tBodies[0].rows.length){
            tblStudent.classList.add('empty');
        }
    }

});





frmStudent.addEventListener('reset',(evetData)=>{
    evetData.preventDefault();
    [txtName,txtAddress,txtContact].forEach(input=>{
        input.value='';
        input.classList.remove('is-invalid');
    });
    txtName.focus();
});


const inputListner=(evetData)=>{
    evetData.target.classList.remove('is-invalid');
};

[txtName,txtAddress,txtContact].forEach(input=>input.addEventListener('input',inputListner));


btnNew.addEventListener('click',()=>{
    [txtId,txtName,txtAddress,txtContact,btnClear,btnSave].forEach(ctrl=> ctrl.disabled=false);
    txtId.value=generateNewStudentId();
    btnClear.click();
    students.forEach(student => student.rowElm.classList.remove('selected'));
    btnSave.innerText='Save Student';

    slectedStudent=null;

});

btnSave.addEventListener('click',()=>{
    let invalidInput = null;

    if (!regExp4Name.test(txtName.value.trim())){
        txtName.classList.add('is-invalid');
        if (!invalidInput) invalidInput = txtName;
    }  
    if (!regExp4Address.test(txtAddress.value.trim())){
        txtAddress.classList.add('is-invalid');
        if (!invalidInput) invalidInput = txtAddress;
    }     
    if (!regExp4Contact.test(txtContact.value)){
        txtContact.classList.add('is-invalid');
        if (!invalidInput) invalidInput = txtContact;
    }
    if (invalidInput) {
        invalidInput.select();
        return;
    }
    if(btnSave.innerText=='Save Student'){
        students.push(new Student(txtId.value,txtName.value,txtContact.value,txtAddress.value));
        btnNew.click();
    }else{
        slectedStudent.name=txtName.value;
        slectedStudent.contact=txtContact.value;
        slectedStudent.address=txtAddress.value;

    }
});

function generateNewStudentId(){
    if(!students.length){
        return 'S001';
    }else{
        const newId = +students[students.length-1].id.replace("S","")+1;  //+
        if(newId<10){
            return `S00${newId}`;
        }else if(newId<100){
            return `S0${newId}`;    
        }else if(newId<1000){
            return `S${newId}`;    
        }else{
            return null;
        }
    }

}