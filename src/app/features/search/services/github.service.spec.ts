import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GithubService } from './github.service';
import { SearchResults } from '../models/search-results';
import { HttpErrorResponse } from '@angular/common/http';

describe('GithubService', () => {
  let service: GithubService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService],
    });
    service = TestBed.inject(GithubService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchRepositories', () => {
    const apiUrl = 'https://api.github.com/search/repositories';

    it('should return search results when the API call is successful', () => {
      const query = 'angular';
      const page = 1;
      const pageSize = 10;

      const mockResponse: SearchResults = {
        query,
        total_count: 2,
        incomplete_results: false,
        items: [
          {
            name: 'angular-repo-1',
            description: 'This is repo 1',
            watchers: 10,
            html_url: 'https://github.com/angular/angular-repo-1',
            forks: 5,
            stargazers_count: 20,
            owner: { login: 'angular', avatar_url: 'https://avatar.url' },
          },
          {
            name: 'angular-repo-2',
            description: 'This is repo 2',
            watchers: 15,
            html_url: 'https://github.com/angular/angular-repo-2',
            forks: 8,
            stargazers_count: 30,
            owner: { login: 'angular', avatar_url: 'https://avatar.url' },
          },
        ],
      };

      service.searchRepositories(query, page, pageSize).subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne(
        `${apiUrl}?q=${query}&per_page=${pageSize}&page=${page}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle API errors correctly', () => {
      const query = 'invalid-query';
      const page = 1;
      const pageSize = 10;
      const errorMessage = `Error Code: 404\nMessage: Http failure response for https://api.github.com/search/repositories?q=invalid-query&per_page=10&page=1: 404 Not Found`;

      service.searchRepositories(query, page, pageSize).subscribe({
        next: () => fail(errorMessage),
        error: (error: HttpErrorResponse) => {
          expect(error.message).withContext('message').toEqual(errorMessage);
        },
      });

      const req = httpTestingController.expectOne(
        `${apiUrl}?q=${query}&per_page=${pageSize}&page=${page}`
      );
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });
});
