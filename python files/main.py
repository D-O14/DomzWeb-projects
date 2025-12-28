"""
#a, b = 0,1
#c, d = 2,3
#e, f = 4,5

#if a > b:
#    print("a ({}) is greater than b({})".format(a, b))
#else:
#     print("b ({}) is less than a({})".format(a, b)),

#if c < d:
#    print("c ({}) is less than d({})".format(c, d))
#else:
#     print("d ({}) is less than c({})".format(c, d)),

#if e != f:
#    print("e({}) is not equals to f({})".format(e, f))
#else:
#     print("e({}) is equals to f({})".format(e, f))  

#print("foo" if a < b else "bar")
#print("foo" if c > d else "bar")
#print("foo" if e != f else "bar")

#a, b = 0,1
#while b < 50:
#    print(b)
#    a, b = b, a + b 
#print("done")

#fh = open('Exercise files/lines.txt')
#for line in fh.readlines():
#   print(line)

#def greet(*names):
 #   for name in names:
  #      print("Hello" ,name)

#greet("John","Alex","Damian")

#def wish(name, msg):
#    print("Hello", name + ' ' + msg)
#wish("Dan","Happy birthday")

#pi = 3.14
#def area(r):

#    return pi*r*r
#r=int(input("Enter radius of circle"))

#print(area(r))

#def calculate(a,b):
#    total = a+b
#    diff = a-b
#    prod = a*b
#    div = a/b
#    mod = a%b

#return total, diff, prod, div, mod
#a=int(input("Enter value of a"))
#b=int(input("Enter value of b"))

#calculate(a,b)

#s,d,p,q,m = calculate(a,b)

#print("Sum= ",s,"diff= ",d,"mul= ",p,"div= ",q,"mod= ",m)

def mark(a):
    if a > 60:
        return "Passed"
    else:
        return "Failed"
#a=int(input("Enter score"))

#print(mark())

#name = "Dan"
#print(name)

#if name is True:
#    name = str(input("What is your name"))
#print(name + ' ' "is a cool name")

count = 10
while (count > 0):
# print (count)
 count = count - 1
#print("BOOM!")

numbers = [1,2,4,11,20]
#seq = 0
#for val in numbers:
#   seq = val*val
#   print(seq)


def area(radius):
 temp = 3.14 * radius**2
 return temp
print(area(21))

def display():
   print("I am man")
display()

def func1(a):
   print(a)
func1("This is Function1")

def func2():
   return "Welcome to python"
print(func2())

def func3(b):
   return b
print(func3("This is function3"))

str = "Hello World"
print(str[0])
print(str[1])
print(str[2])
print(str[2:5])
print(str[2:])
print(str[-1])
print(str + ' ' "Test")

import string
print(string.ascii_letters)
print(string.ascii_lowercase)
print(string.ascii_uppercase)
print(string.digits)
print(string.hexdigits) 
print(string.punctuation)

from array import *
array1 = array('i',[10,20,30,40,50])
print(array1[0])
print(array1[2])
print(array1[4])

list1 = []
for x in range(15):
    list1.append(x**2)
print(list1)

x = (i for i in 'abc')
print(x)
for i in x:
   print(i)

   
a = 14
b = 2

try:
      print("Resource opened")

      print(a/b)

      x = int(input("Enter a number"))

      print(x)

except Exception as e:
      print("Number cannot be divided", e)
finally:
      print("Resource closed")

"""

college = ["uni", "biu", "oxford", "abuad"]
college.append("nile")
#college.pop(0)
#del(college[2])
#college.reverse()
#college.insert(5, 2)
#print(college)
appraisal = len(college)
#print(appraisal)

#student = ["age", "name", "status", "gender", "result"]
#college.extend(student)
#print(college)

#def expo():
    #str = "mrcet college"
    #x = 20
#    return (str, x)

#str, x = expo()
#print (str)
#print(x)


z = [(x,x**2) for x in range(10)]
#print(z)
 
a = {x for x in 'asterisk' if x not in 'abc'}
#print(a)

x = {4*x for x in range(10) if x>5}
#print(x) 
#print(range)

#Brand = "Toyota"
#Year = "2015"
#Model = "Camry"

dict1 = {"Brand":"Toyota", "Year":2015, "Model":"Camry"}
#dict1["Year"] = 2020
#dict1["Name"] = "Toyota Urus 2020"
#print(dict1.pop("Name"))
#print(dict1)

#a = dict1["Brand"]
#print(a)
#b = dict1["Year"]
#print(b)
#c = dict1["Model"]
#print(c)
#dict1.keys()
#dict1.values()
#dict1.items()
#for items in dict1.keys():
#    print(items)

#UFC = [1,2,3]
#Name = ["John", "Smith", "Anderson"]
UFC1 = 1
Name1 = "John"
UFC2 = 2
Name2 = "Smith"
UFC3 = 3
Name3 = "Anderson" 
customers = [{UFC1, Name1}, {UFC2, Name2}, {UFC3, Name3}]
#del customers[1]
#print(customers[0])
#print(customers[1])
#print(customers[2])
#print(customers)
#for x in customers:
#    print(x[UFC], x[Name])

z = {x:x**2 for x in (2,4,6)}
#print(z)

import sys
#sys.modules.keys()

arg = sys.argv
#print(sys.argv[0])

import sys
#print("System version is:")
#print(sys.version)
#print("Version Information is:")
#print(sys.version_info)

import argparse
parser  = argparse.ArgumentParser()
#print(parser.parse_args()) 

import datetime
a = datetime.datetime.today()
c = datetime.timedelta(days=7)
#print(a+c)

import time
#time.sleep(6)
#print("Welcome to Python Lab")

import math
#r = int(input("Enter radius:"))
#area = math.pi*r*r
#print("Area of circle is:", area)

from math import pi, e
#print(pi)
#print(e)

import calendar
#print(calendar)
#from calendar import NOVEMBER
#print(NOVEMBER)

#Python Banking Program
"""
def show_balance(balance):
    print(f"Your balance is ${balance:.2f}")

def deposit():
    amount = float(input("Enter an amount to be deposited:"))

    if amount < 0:
        print("Invalid amount")
        return 0
    else:
      return amount

def withdraw(balance):
    amount = float(input("Enter amount to be withdrawn:"))

    if amount > balance:
        print("Insufficient Funds")

    elif amount < 0:
        print("Cannot withdraw negative numbers")
        return 0
    else:
        return amount

def main():
   balance = 0
   is_running = True

   while is_running:
      print("*******************")
      print("   Banking program    ")
      print("*******************")

      print("1.Show Balance")
      print("2.Deposit")
      print("3.Withdraw")
      print("4.Exit")

      print("*******************")
      choice = input("Enter your choice (1-4):")

      if choice == '1':
         show_balance(balance)
      elif choice == '2':
         balance += deposit()
      elif choice == '3':
         balance -= withdraw(balance)
      elif choice == '4':
         print("Goodbye")
         is_running = False
      else:
         print("Invalid Choice")
      
if __name__ == '__main__': main()

"""

# User Input
"""
name = input("Enter your name:")
age = int(input("Enter your age:"))
print(f"Hello {name}")
print(f"You are {age} years old")



adjective1 = input("Enter an adjective:")
noun = input("Enter a noun:")
adjective2 = input("Enter an adjective:")
verb = input("Enter a verb:")
adjective3 = input("Enter an adjective:")

print(f"Today I went to an {adjective1} zoo")
print(f"In an exhibit, I saw {noun}")
print(f"{noun} was {adjective2} and {verb}ing")
print(f"I was {adjective3}")



item = input("What are you looking for today?:")
price = float(input("What is the price?:"))
quantity = int(input("How many would you like?:"))

total = price * quantity

print(f"You have bought {quantity} {item}, your total is: ${round(total, 2)}")

"""
#Calculator

"""
operator = input("Enter an operator (+ - * /):")
num1 = float(input("Enter the 1st number:"))
num2 = float(input("Enter the 2nd  number:"))

if operator == '+':
   result =  num1 + num2
   print(round(result, 3))

elif operator == '-':
   result =  num1 - num2
   print(round(result, 3))

elif operator == '*':
   result =  num1 * num2
   print(round(result, 3))

elif operator == '/':
   result =  num1 / num2
   print(round(result, 3))

else:
   print(f"{operator} is not a valid operator")

   """

#Countdown program
"""

import time

my_time = int(input("Enter the time in seconds:"))
for x in range(my_time, 0, -1):
   seconds = x % 60 
   minutes = int(x / 60) % 60
   hours = (x / 3600) 
   print(f"{round(hours):02}:{round(minutes):02}:{round(seconds):02}")
   time.sleep(1)
print("Times's up!")

"""
#Shopping cart program
"""
foods = []
prices = []
total = 0

while True:
    food = input("What would you like to buy?:")
    if food.lower() == "q":
        print("Goodbye")
        break
    else:
        price = float(input(f"Enter the price of a {food}: $"))
        foods.append(food)
        prices.append(price)

print("----- YOUR CART -----")

for food in foods:
    print(f"{food}")

for price in prices:
   total += price

print("______________")
print()
print(f"Your total is: ${total}")
print("______________")

"""
#Encryption program

"""
import random
import string

chars = string.punctuation + string.digits + string.ascii_letters
chars = list(chars)
key = chars.copy()
random.shuffle(key)

print(f"chars: {chars}")
print(f"key: {key}")

plain_text = input("Enter a message: ")
cipher_text = ""

for letter in plain_text:
    index = chars.index(letter)
    cipher_text += key[index]

print(f"original message: {plain_text}")
print(f"encrypted message: {cipher_text}")

def get_phone(country, area, first, last):
    return f"{country}-{area}-{first}-{last}"
phone_num = get_phone(country=1, area=123, first=456, last=7890)
print(phone_num)

"""
#import sys
#print(sys.path)
#from pyQt5.QtWidgets import QApplication, QMainWindow

"""
class shapes:
    def __init__(self, color, filled):
        self.color = color
        self.filled = filled

    def describe(self):
        print(f"It is {self.color} and {'filled' if self.filled else 'not filled'}")

class circle(shapes):
    def __init__(self, color, filled, radius):
        super().__init__(color, filled)
        self.radius = radius

class square(shapes):
    def __init__(self, color, filled, width):
        super().__init__(color, filled)
        self.width = width

class triangle(shapes):
    def __init__(self, color, filled, width, height):
        super().__init__(color, filled)
        self.width = width
        self.height = height

Circle = circle("Red", True, 5)
Square = square("Yellow", False, 6)
Triangle = triangle("Blue", True, 6, 7)

print(Circle.color)
print(Circle.filled)
print(f"{Circle.radius}cm")
Circle.describe()

print(Square.color)
print(Square.filled)
print(f"{Square.width}cm")
Square.describe()

print(Triangle.color)
print(Triangle.filled)
print(f"{Triangle.width}cm")
print(f"{Triangle.height}cm")
Triangle.describe()


class Library:
    def __init__(self, name):
       self.name = name
       self.books = []

    def add_book(self, book):
       self.books.append(book)

    def list_books(self):
       return [f"{book.title} by {book.author}" for book in self.books]

class Book:
   def __init__(self, title, author):
      self.title = title
      self.author = author       

library = Library("New York Public Library")

book1 = Book("Harry Potter...", "J.K. Rowling")
book2 =  Book("The Hobbit","J. R. R. Tolkein")
book3 = Book("The Colour of Magic", "Terry Pratchet")

library.add_book(book1)
library.add_book(book2)
library.add_book(book3)

print(library.name)

for book in library.list_books():
   print(book) 

class Engine():
    def __init__(self, HP):
        self.HP = HP

class Wheel():
    def __init__(self, size):
         self.size = size

class Car():
    def __init__(self, make, model, HP, wheel_size):
        self.make = make
        self.model = model
        self.engine = Engine(HP)
        self.wheels  = [Wheel(wheel_size) for wheel in range(4)]

    def display_car(self):
        return f"{self.make} {self.model} {self.engine.HP}(hp) {self.wheels[0].size}in"

car1 = Car("Ford", "Mustang", 500, 18)        
car2 = Car("Chevrolet", "Corvette", 670, 20)

print(car1.display_car())
print(car2.display_car())

"""

#import time
#import datetime
#import pygame

#def set_alarm(alarm_time):
#    print(f"Alarm set for {alarm_time}")
    

#if __name__ == "__main__:":
#    alarm_time = input("Enter the alarm time (HH:MM:SS):  ")
#  
#   set_alarm(alarm_time)
"""
Flask db init
Flask db Migrate
Flask db upgrade

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

# in shell
app.app_context().push()

"""