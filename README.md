# RNA-Secondary-Structure

## How to run locally:

### Pre-requisites:
Make sure you have ViennaRna installed on your system. You can download a pre-compiled binary or the source code from [here](https://www.tbi.univie.ac.at/RNA/index.html).
If you want to build the package from source, you will find detailed instructions [here](https://github.com/soppydart/RNA-Secondary-Structure/files/15134737/RNA-tutorial-2.6.4.pdf).

### Installation and Usage

```bash
cd fornac/
npm install
npm run dev
```

In another terminal instance, at the root of the project, run:
```bash
g++ main.cpp && ./a.out
```

When prompted, input the name of the file (present in 'input-sequences/') that contains the RNA sequence, for example:</br>
```input1.seq```

To view the visualization of the secondary structure, click on the link displayed in the console.
