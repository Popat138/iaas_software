import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MaterialModule } from '../material';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  college: any;

  authenticationRequest: any = {
    email: "",
    password: ""
  }

  constructor(
    private router : Router,
    public service : ServiceService
  ) {}

  ngOnInit(): void {
    this.service.getData("/college/" + 1).subscribe((college: any) => {
      this.college = college;
    }, (err: any) => {
      console.log("Error try again later");
    })
  }

  authenticate() {
    this.service.postData("/user/authenticate", this.authenticationRequest).subscribe((res: any) => {
      console.table(res);
      localStorage.setItem("userId", res.userId);
      if(res.role.roleName == "SuperAdmin") {
        this.router.navigateByUrl('/super-admin-layout');
      } else if(res.role.roleName == "IQAC") {
        this.router.navigateByUrl('/iqac-layout/create-department');
      } else if(res.role.roleName == "Hod") {
        this.router.navigateByUrl('/department-event-layout/report-of-event');
      }else if(res.role.roleName == "Committee_chairman") {
        this.router.navigateByUrl('/committee-layout/committee-details');
      } else if(res.role.roleName == "OfficeClerk") {
        this.router.navigateByUrl('/office-layout/student-data-academic-detail');
      } else if(res.role.roleName == "ScholarshipClerk") {
        this.router.navigateByUrl('/office-layout/scholarship-data');
      } else if(res.role.roleName == "Accountant") {
        this.router.navigateByUrl('/office-layout/audit-finanace-data');
      } else if(res.role.roleName == "Teacher") {
        this.router.navigateByUrl('/teacher-layout/uploads');
      } else if(res.role.roleName == "Librarian") {
        this.router.navigateByUrl('/library-layout/ilms-info');
      }else if(res.role.roleName == "Feedback") {
          this.router.navigateByUrl('/admin-layout');
        
      }else if(res.role.roleName == "Crh") {
        this.router.navigateByUrl('/critria-layout');
      
    } else {
        console.warn("Other component not ready yet!");
      }
    },
    (err: any) => {
      alert("Email or password is incorrect!!");
    })
  }

  afterlogin(){
    this.router.navigateByUrl('/admin-layout')
  }
   afterlogin1(){
    this.router.navigateByUrl('/teacher-layout')
  }
  afterlogin2(){
    this.router.navigateByUrl('/admin-layout')
  }

}
