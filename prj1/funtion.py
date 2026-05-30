# def greet():
#     print("Hello, welcome to the world of programming!")

# greet()
# greet()
# greet()       ## def is the keyword , greet is the function name, () is used to call the function and : is used to indicate the start of the function body.


# def greet(name):
#     print("Hello " + name + ", welcome to the world of programming!")
# greet("Surya");
# greet("Mugesh");


## here now we adding a parameter to the function, which is name. When we call the function, we pass an argument (Surya and Mugesh) to the function, which is then used in the function body to print a personalized greeting message.


# def add(a,b):
#     return a+b;

# print(add(10,20))   ## this will give an error because the function add is not defined yet.

# def greet(name):
#     return ""
# print(greet("Surya"));  ## this will give an error because the function greet is not defined yet.


# Return statement

# def add(a,b):
#     return a+b;

# a = int(input("Enter a number: "));
# b = int(input("Enter another number: "));

# result = add(a,b);
# print(result);   ## this will give an error because the function add is not defined yet.

## multiple parameters

# def student(name, age, branch):
#     print("Name: " + name)
#     print("Age: " + str(age))
#     print("Branch: " + branch)
# student("Surya", 20, "Computer Science")


## Default Arguments
# def student(name="Nikhil"):
#     print("Name: " + name)
# student()
# student("Surya")


## Keyword Arguments
# def employee(name, salary):
#     print(name, salary)

# employee(salary=50000, name="Surya")

def employee(name, salary):
    print(name, salary)
employee(salary = 50000 , name = "Surya")   ## this will give an error because we cannot assign values to variables in this way. We need to use the keyword arguments in the function definition and then call the function with the arguments.
