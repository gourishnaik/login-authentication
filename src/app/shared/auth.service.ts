import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth:AngularFireAuth,private router:Router) { }

  //login
  login(email:string,password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( (res)=>{
   localStorage.setItem('token','true');
 //this.router.navigate(['/dashboard']);

//if user is not verified
if(res.user?.emailVerified==true){
 //this.sendEmailForVerification(res.user)
  this.router.navigate(['/dashboard']);
}
else{
  this.router.navigate(['/verify'])
}

    },err=>{
alert(err.message)
this.router.navigate(['/login']);
    })
  }

  // register or signin
  register(email:string,password:string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then((res)=>{
      alert("registration is successful")
     //after registration send email for verification
      this.sendEmailForVerification(res.user)
      this.router.navigate(['/login']); 
    },err=>{
      alert(err.message)
      this.router.navigate(['/register'])
    })
  }

  //signout
logout(){
  this.fireauth.signOut().then(()=>{
  localStorage.removeItem('token');
  this.router.navigate(['/login'])
  },err=>{
    alert(err.message)
  })
}

//forgot password
forgotpassword(email:string){
this.fireauth.sendPasswordResetEmail(email).then(()=>{
this.router.navigate(['/verify'])
},err=>{
    alert(err.message)
  })
}

sendEmailForVerification(user : any) {
  console.log(user);
 user.sendEmailVerification().then((user : any) => {
  console.log('sent')
   this.router.navigate(['/verify']);
  }, (err : any) => {
    alert('Something went wrong. Not able to send mail to your email.')
  })

}
}



