import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientePessoaJuridicaService } from 'app/entities/cliente-pessoa-juridica/cliente-pessoa-juridica.service';
import { IClientePessoaJuridica, ClientePessoaJuridica } from 'app/shared/model/cliente-pessoa-juridica.model';

describe('Service Tests', () => {
  describe('ClientePessoaJuridica Service', () => {
    let injector: TestBed;
    let service: ClientePessoaJuridicaService;
    let httpMock: HttpTestingController;
    let elemDefault: IClientePessoaJuridica;
    let expectedResult: IClientePessoaJuridica | IClientePessoaJuridica[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ClientePessoaJuridicaService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new ClientePessoaJuridica(0, 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ClientePessoaJuridica', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ClientePessoaJuridica()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ClientePessoaJuridica', () => {
        const returnedFromService = Object.assign(
          {
            cnpj: 1,
            razaoSocial: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ClientePessoaJuridica', () => {
        const returnedFromService = Object.assign(
          {
            cnpj: 1,
            razaoSocial: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ClientePessoaJuridica', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
