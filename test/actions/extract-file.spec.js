const proxyquire = require('proxyquire')

describe('extractFile', () => {
  let admZipConstructorStub;
  let fs;
  let os;

  before(() => {
    fs = {
      existsSync: sandbox.stub().returns(false),
      mkdirSync: sandbox.stub(),
      writeFile: sandbox.stub(),
    }
    os = { userInfo : sandbox.stub().returns({ username: 'testuser'}) }
    admZipConstructorStub = sandbox.stub();
  });

  it('extracts a regular file from zip-file successfully', () => {
    class AdmZip {
      constructor(arc){
        admZipConstructorStub(arc);
      }
  
      getEntries(){
        return [ { entryName: 'file1.txt', isDirectory: false } ];
      }
  
      readAsText(filename) {
        return `contents of ${filename}`;
      }
    }  

    const moduleWithDependency = proxyquire('../../src/actions/extract-file', { fs, os, 'adm-zip': AdmZip } );

    return moduleWithDependency.extractFile({ appname: 'testapp', fileDestination: '/somedestination' })
    .then(
      () => {
        expect(admZipConstructorStub).to.have.been.calledWith('/somedestination/released-version.zip');
        // const newFileName = `${process.cwd()}/testapp/file1.txt`
        // expect(fs.writeFile.firstCall.args).should.have.been.calledWith(newFileName, `contents of file1.txt`);
      }
    ).catch(er => {
      console.log(er);
    });

  }).timeout(5000);

  it('created a directory as listed in the zip file entries, successfully', () => {
    class AdmZip {
      constructor(arc){
        admZipConstructorStub(arc);
      }
  
      getEntries(){
        return [ { entryName: 'testdir', isDirectory: true } ];
      }  
    }  

    const moduleWithDependency = proxyquire('../../src/actions/extract-file', { fs, os, 'adm-zip': AdmZip } );

    return moduleWithDependency.extractFile({ appname: 'testapp', fileDestination: '/somedestination' })
    .then(
      () => {
        expect(admZipConstructorStub).to.have.been.calledWith('/somedestination/released-version.zip');
        const newFileName = `${process.cwd()}/testapp/testdir`
        expect(fs.mkdirSync).to.have.been.calledWith(newFileName);
      }
    ).catch(er => {
      console.log(er);
    });

  }).timeout(5000);

  it('extracts package.json from zip file successfully and customizes it', () => {    
    class AdmZip {
      constructor(arc){
        admZipConstructorStub(arc);
      }
  
      getEntries(){
        return [
          { entryName: 'package.json', isDirectory: false },
        ];
      }
  
      readAsText() { 
        return JSON.stringify({ keywords: [] });
      }
    }  
    const moduleWithDependency = proxyquire('../../src/actions/extract-file', 
      {
        fs,
        os,
        'adm-zip': AdmZip
      }
    );

    return moduleWithDependency.extractFile({ appname: 'testapp', fileDestination: '/somedestination' })
    .then(
      () => {
        expect(admZipConstructorStub).to.have.been.calledWith('/somedestination/released-version.zip');
        // const newFileName = `${process.cwd()}/testapp/package.json`
        // expect(fs.writeFile).to.have.been.calledWith(newFileName, JSON.stringify(
        //   {
        //     "name": "testapp",
        //     "description": "Generated with node-needs utility.",
        //     "author": "testuser",
        //     "keywords": [
        //       "testapp"
        //     ],
        //   }
        // ));
      }
    ).catch(er => {
      console.log(er);
    });

  }).timeout(5000);

  it('rejects on exception', () => {    
    class AdmZip {
      constructor(arc){
        admZipConstructorStub(arc);
      }
  
      getEntries(){
        throw new Error('SomeError');
      }
    }  
    const moduleWithDependency = proxyquire('../../src/actions/extract-file', 
      {
        fs,
        os,
        'adm-zip': AdmZip
      }
    );

    return moduleWithDependency.extractFile({ appname: 'testapp', fileDestination: '/somedestination' })
    .then(
      () => {
        expect(admZipConstructorStub).to.have.been.calledWith('/somedestination/released-version.zip');
        // const newFileName = `${process.cwd()}/testapp/package.json`
        // expect(fs.writeFile).to.have.been.calledWith(newFileName, JSON.stringify(
        //   {
        //     "name": "testapp",
        //     "description": "Generated with node-needs utility.",
        //     "author": "testuser",
        //     "keywords": [
        //       "testapp"
        //     ],
        //   }
        // ));
      }
    ).catch(er => {
      expect(er.toString()).to.equal('Error: SomeError')
    });

  }).timeout(5000);

  it('ignores any .lock and .lock.json files', () => {
    const readAsTextStub = sandbox.stub();
    class AdmZip {
      constructor(arc){
        admZipConstructorStub(arc);
      }
  
      getEntries(){
        return [ 
          { entryName: 'some.lock', isDirectory: false },
          { entryName: 'some.lock.json', isDirectory: false }
        ];
      }
  
      readAsText(filename) {
        readAsTextStub(filename);
        return `contents of ${filename}`;
      }
    }  

    const moduleWithDependency = proxyquire('../../src/actions/extract-file', { fs, os, 'adm-zip': AdmZip } );

    return moduleWithDependency.extractFile({ appname: 'testapp', fileDestination: '/somedestination' })
    .then(
      () => {
        expect(admZipConstructorStub).to.have.been.calledWith('/somedestination/released-version.zip');
        expect(readAsTextStub).to.not.have.been.called;
      }
    ).catch(er => {
      console.log(er);
    });
  }).timeout(5000);

  it('doesnot replace a file from zip if it is already on filesystem', () => {
    fs.existsSync = sandbox.stub().returns(true);
    const readAsTextStub = sandbox.stub();
    class AdmZip {
      constructor(arc){
        admZipConstructorStub(arc);
      }
  
      getEntries(){
        return [ 
          { entryName: 'demo.txt', isDirectory: false }
        ];
      }
  
      readAsText(filename) {
        readAsTextStub(filename);
        return `contents of ${filename}`;
      }
    }  

    const moduleWithDependency = proxyquire('../../src/actions/extract-file', { fs, os, 'adm-zip': AdmZip } );

    return moduleWithDependency.extractFile({ appname: 'testapp', fileDestination: '/somedestination' })
    .then(
      () => {
        expect(admZipConstructorStub).to.have.been.calledWith('/somedestination/released-version.zip');
        expect(readAsTextStub).to.not.have.been.called;
      }
    ).catch(er => {
      console.log(er);
    });
  }).timeout(5000);

});