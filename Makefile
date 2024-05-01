CC = g++
CFLAGS = -std=c++20 -I$(INCDIR)

SRCDIR = src
INCDIR = include
LIBDIR = lib
BUILDDIR = build
BINDIR = bin
TARGET = $(BINDIR)/program

SRCS := $(wildcard $(SRCDIR)/*.cpp)
OBJS := $(patsubst $(SRCDIR)/%.cpp,$(BUILDDIR)/%.o,$(SRCS))

all: $(TARGET)

$(TARGET): $(OBJS)
	@mkdir -p $(BINDIR)
	$(CC) $(CFLAGS) -o $(TARGET) $(OBJS)

$(BUILDDIR)/%.o: $(SRCDIR)/%.cpp
	@mkdir -p $(BUILDDIR)
	$(CC) $(CFLAGS) -c -o $@ $<

run-program: $(TARGET)
	$(TARGET)

clean:
	rm -rf $(BINDIR) $(BUILDDIR) rna.ps