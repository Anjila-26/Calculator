def calculator():
    print("Simple Calculator")
    while True:
        try:
            num1 = float(input("Enter first number: "))
            op = input("Enter operator (+, -, *, /, **): ")
            num2 = float(input("Enter second number: "))

            if op == '+':
                result = num1 + num2
            elif op == '-':
                result = num1 - num2
            elif op == '*':
                result = num1 * num2
            elif op == '/':
                if num2 == 0:
                    print("Error: Division by zero.")
                    continue
                result = num1 / num2
            elif op == '**':
                result = num1 ** num2
            else:
                print("Invalid operator.")
                continue

            print(f"Result: {result}")
        except ValueError:
            print("Invalid input. Please enter numbers.")

        cont = input("Do you want to continue? (y/n): ").lower()
        if cont != 'y':
            print("Goodbye!")
            break

if __name__ == "__main__":
    calculator()