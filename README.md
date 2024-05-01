# RNA-Secondary-Structure

 An implementation of the dynamic programming algorithm to predict the secondary structure of an RNA molecule and visualize it.

## Table of Contents

- [RNA-Secondary-Structure](#rna-secondary-structure)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Setting Up](#setting-up)
        - [HTTPS](#https)
        - [SSH](#ssh)
  - [Usage](#usage)
    - [Screenshots](#screenshots)
  - [Directory Structure](#directory-structure)
  - [License](#license)

## Getting Started

### Prerequisites

- [The ViennaRNA Package](https://www.tbi.univie.ac.at/RNA/index.html)
- [GNU Make](https://www.gnu.org/software/make/) 
- [GCC](https://gcc.gnu.org/)

### Setting Up

1. Clone this repository:

##### HTTPS
```bash
git clone https://github.com/soppydart/RNA-Secondary-Structure.git
```

##### SSH
```bash
git clone git@github.com:soppydart/RNA-Secondary-Structure.git
```

2. Navigate to the project directory.
```bash
cd RNA-Secondary-Structure/
```

3. Execute the following command. This will both compile the program if necessary and execute it. For further details, check [Usage](#usage).

```bash
make run-program
```

4. To clean up the generated files and directories, use the following command:
   
```bash
make clean
```

## Usage

When prompted, input the name of the file (present in `rna-sequences/`) that contains the RNA sequence, for example:
```input1.seq```

To view the visualization of the secondary structure, navigate to the link displayed in the console.

### Screenshots

![terminal output](/docs/assets/Screenshots/image-3.png)
![maximizing pairs](/docs/assets/Screenshots/image-1.png)
![secondary structure](/docs/assets/Screenshots/image-2.png)

## Directory Structure

- `src/`: Contains the source code files (.cpp).
- `include/`: Contains the header files (.h).
- `lib/`: Contains a reusable header file defining a struct.
- `build/`: Directory where object files (.o) are stored after compilation.
- `bin/`: Directory where executable files are stored after compilation.

## License

This project is licensed under the Apache License Version 2.0. You can find the full text of the license in the [LICENSE](LICENSE) file.
