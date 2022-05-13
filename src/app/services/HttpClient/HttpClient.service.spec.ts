import { TestBed } from '@angular/core/testing';

import { HttpClient,HttpErrorResponse } from '@angular/common/http'
import { HttpclientService } from '../HttpClient/HttpClientServices'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
xdescribe('HttpclientService', () => {
  let httpTestCtrl: HttpTestingController;
  let dataService: HttpclientService;
  const BASE_URL='https://jsonplaceholder.typicode.com/posts'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpclientService]
    });
  });

  beforeEach(() => {
    dataService = TestBed.inject(HttpclientService);
    httpTestCtrl = TestBed.inject(HttpTestingController)
  });

  it('should test HttpClient.get', () => {
    const testResult:Post[] = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  }]
    dataService.getWithUrl<Post[]>(BASE_URL).subscribe((valore) => {
      expect(testResult).toBe(valore);
    });

    const req = httpTestCtrl.expectOne(BASE_URL);
    expect(req.cancelled).toBeFalsy()
    expect(req.request.responseType).toEqual('json')

    req.flush(testResult)

  })

});
