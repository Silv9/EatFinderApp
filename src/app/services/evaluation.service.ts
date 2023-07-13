import { Evaluation } from './../interfaces/evaluation';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private api="http://localhost:9000/api";
  
  getAllEvaluation(){
    const path=`${this.api}/evaluat`;
    return this.httpclient.get<Evaluation[]>(path);
  }

  getEvaluation(id:string){
    const path=`${this.api}/evaluat/${id}`;
    return this.httpclient.get<Evaluation[]>(path);
  }

  createEvaluation(evaluation:Evaluation){
    const path=`${this.api}/evaluat`;
    return this.httpclient.post(path,evaluation);
  }
  updateEvaluation(evaluation:Evaluation){
    const path=`${this.api}/evaluat/${evaluation.id}`;
    return this.httpclient.put<Evaluation>(path,evaluation);
  }

  deleteEvaluation(id:string){
    const path=`${this.api}/evaluat/${id}`;
    return this.httpclient.delete(path);
  }

  constructor(private httpclient:HttpClient) { }

}





