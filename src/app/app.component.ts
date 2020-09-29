import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, Validators, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 ngOnInit(){ this.getbrand() }
 constructor(private http: HttpClient){ 
   this.form=new FormGroup({
     'vehiculo':new FormControl('',[Validators.required]),
     'submarca':new FormControl('',[Validators.required]),
     'modelo':new FormControl('',[Validators.required]),
     'descripcion':new FormControl('',[Validators.required]),
     'codigo':new FormControl('',[Validators.required]),
     'estado':new FormControl('',[Validators.required]),
     'municipio':new FormControl('',[Validators.required]),
     'colonia':new FormControl('',[Validators.required]),
     'fecha':new FormControl('',[Validators.required])
   });
   this.form.get('vehiculo').valueChanges.subscribe(a1=>{
     console.log(a1)
     this.getsubbrand()
     this.form.get('modelo').setValue('')
     this.form.get('descripcion').setValue('')
     }
   )
   this.form.get('submarca').valueChanges.subscribe(a1=>{
     this.getmodel()
     this.form.get('descripcion').setValue('')
   })
   this.form.get('modelo').valueChanges.subscribe(a1=>{
     
     this.getdescription()
   })
  }
 public form: FormGroup;
 getbrand(){ let post = {NombreCatalogo : "Marca",
Filtro: '1', IdAplication: 2}
   this.http.post('https://apitestcotizamatico.azurewebsites.net/api/catalogos',post)
   .subscribe((request:any)=>{
     console.log(request)
     let n = JSON.parse(request.CatalogoJsonString)
     this.marcas = n
     console.log(this.marcas)
   })
 }
 public submarca: any;
 getsubbrand(){ let post = {NombreCatalogo : "Submarca",
Filtro: this.form.get('vehiculo').value, IdAplication: 2}
   this.http.post('https://apitestcotizamatico.azurewebsites.net/api/catalogos',post)
   .subscribe((request:any)=>{
     console.log(request)
     let n = JSON.parse(request.CatalogoJsonString)
     this.submarca = n
     console.log(this.submarca)
   })
 }
 public modelo: any;
 getmodel(){ let post = {NombreCatalogo : "Modelo",
Filtro: this.form.get('submarca').value, IdAplication: 2}
   this.http.post('https://apitestcotizamatico.azurewebsites.net/api/catalogos',post)
   .subscribe((request:any)=>{
     console.log(request)
     let n = JSON.parse(request.CatalogoJsonString)
     this.modelo = n
     console.log(this.modelo)
   })
 }
 public descripcion: any;
 getdescription(){ let post = {NombreCatalogo : "DescripcionModelo",
Filtro: this.form.get('modelo').value, IdAplication: 2}
   this.http.post('https://apitestcotizamatico.azurewebsites.net/api/catalogos',post)
   .subscribe((request:any)=>{
     console.log(request)
     let n = JSON.parse(request.CatalogoJsonString)
     this.descripcion = n
     console.log(this.descripcion)
   })
 }
 public marcas: any;
 public codigo: any=[];
 public ubicacion=[];
 getpostalcode(){ let post ={NombreCatalogo : "Sepomex",
Filtro:  this.form.get('codigo').value, IdAplication: 2}
this.http.post('https://apitestcotizamatico.azurewebsites.net/api/catalogos',post)
.subscribe((request:any)=>{
  console.log(request)
  let n = JSON.parse(request.CatalogoJsonString)
  this.codigo = n
  this.ubicacion=this.codigo[0].Ubicacion
  this.form.get('municipio').setValue(this.codigo[0].Municipio.sMunicipio)
  this.form.get('estado').setValue(this.codigo[0].Municipio.Estado.sEstado)
  console.log(this.codigo)
})
}
getsuccess(){ 
  if(this.form.valid)
  {
    alert('Se ingreso los datos correctamente')
  }
  else if(this.form.invalid)
  {
    this.form.markAllAsTouched()
    this.form.markAsDirty()
    alert('Por favor de llenar los datos correspondientes')
  }
}
}
