import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";
import { Agent } from "src/app/models/agent.model";
import { environment } from "src/environments/environment";
import { LoadingService } from "../loading/loading.service";

@Injectable({
    providedIn:'root'
})
export class AgentStore{
    private subject = new BehaviorSubject<Agent[]>([]);
    agents$:Observable<Agent[]> = this.subject.asObservable();

    constructor(private http: HttpClient,
        private toastr: ToastrService,
        private loadingService: LoadingService
      ) {
        this.loadAgents();
      }
    
      private loadAgents() {
        const loadAgents$ = this.http.get<Agent[]>(`${environment.apiUrl}/agents`)
          .pipe(
            map(response => response),
            catchError(err => {
              const message = "Could not load Agents";
              this.toastr.error(message);
              console.log("Agentstore:loadAgents", err)
              return throwError(err)
            }),
            tap(agents => this.subject.next(agents))
          )
    
        this.loadingService.showLoaderUntillCompleted(loadAgents$).subscribe();
      }
    
      createAgent(agent:Agent):Observable<any>{
        const agents = this.subject.getValue();
        agents.push(agent);
        this.subject.next(agents);
        return this.http.post<any>(`${environment.apiUrl}/agents`,agent)
          .pipe(
            map(response=>{
              if(response){
                  this.toastr.success("Agent Created Successfully")
                  this.loadAgents();
                }else{
                  this.toastr.warning("Could not Create Agent")
                }
              }
            ),
            catchError(err=>{
              this.toastr.error("Could not Create Agent");
              console.log("Agentstore:createAgent",err)
              return throwError(err)
            })
          )
      }
    
      updateCustmer(id:number,agent:Partial<Agent>):Observable<any>{
        const agents = this.subject.getValue();
        const index = agents.findIndex(agent=>agent.id == id);
    
        const newCustomer:Agent ={
          ...agents[index],
          ...agent
        } 
        const newAgents :Agent[]=agents.slice(0);
        newAgents[index] = newCustomer;
        this.subject.next(newAgents);
    
        return this.http.put<any>(`${environment.apiUrl}/Agents/${id}`,agent)
        .pipe(
          map(response =>{
            if(response.statusCodeValue ==200){
              this.toastr.success("Agent Created Successfully")
            }else{
              this.toastr.warning("Could not Create Agent")
            }
          }),
          catchError(err=>{
            this.toastr.error("Could not Update Agent");
            console.log("Agentstore:customerUpdate",err)
            return throwError(err)
          })
        )
      }
    
      deleteCustmer(id:number):Observable<any>{
        const agents = this.subject.getValue();
        const updatedAgents:Agent[] = agents.filter(agent=>agent.id != id);
    
        this.subject.next(updatedAgents);
    
        return this.http.delete<any>(`${environment.apiUrl}/agents/${id}`)
        .pipe(
          map(response =>{
            if(response.statusCodeValue ==204){
              this.toastr.success("Agent Deleted Successfully")
            }else{
              this.toastr.warning("Could not Delete Agent")
            }
          }),
          catchError(err=>{
            this.toastr.error("Could not Delete Agent");
            console.log("Agentstore:deleteAgent",err)
            return throwError(err)
          })
        )
      }
}