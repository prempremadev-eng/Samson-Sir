# Linux Learning Notes

## 24-09-2026

### 1. mkdir

Command:

mkdir -p ~/Documents/"Samson-Sir"

What is mkdir?

mkdir = make directory

- make = create
- directory = folder

So:

mkdir = create a folder

Example:

mkdir School

This creates:

School/

What is -p?

-p = parents

-p is used when the parent folder may not exist.

Example:

Parent/
└── OurFolder/

We can use:

mkdir -p Parent/OurFolder

If Parent does not exist, Linux creates both folders:

Parent/
└── OurFolder/

Our example:

mkdir -p ~/Documents/"Samson-Sir"

Here:

Documents  = parent folder
Samson-Sir = folder we want to create

Easy to remember:

mkdir = create folder
-p    = create missing parent folders too

2. mv

Command:

mv ~/snap/eclipse/common/eclipse-workspace/DSAPractice ~/Documents/Samson-Sir/11-LeetCode/

Meaning:

mv = move

    First path = source

    Second path = destination

We used this command to move the DSAPractice project from the Eclipse workspace to:

~/Documents/Samson-Sir/11-LeetCode/

Result:

Samson-Sir/
└── 11-LeetCode/
    └── DSAPractice/

Easy to remember:

mv = move a file or folder
