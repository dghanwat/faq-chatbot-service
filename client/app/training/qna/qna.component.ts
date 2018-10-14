import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { QnA, QnATraining } from '../../shared/models/qna.model';
@Component({
    selector: 'qna-app',
    templateUrl: './qna.component.html'
})
export class QnAComponent implements OnInit {

    constructor(private fb: FormBuilder) { }

    qnaForm: FormGroup;

    ngOnInit() {

        /* Initiate the form structure */
        this.qnaForm = this.fb.group({
            qna: this.fb.array([this.fb.group({ question: '' ,answer:''})])
        })
    }

    get qnaRow() {
        return this.qnaForm.get('qna') as FormArray;
    }


    addQnARow() {
        this.qnaRow.push(this.fb.group({ question: '' ,answer:''}));
    }

    deleteQnARow(index) {
        this.qnaRow.removeAt(index);
    }
}
