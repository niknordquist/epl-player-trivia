import random
import pandas as pd

playerDatabase = pd.read_csv('playerDatabase.csv')
hints = [False, False, False]


def begin():
    answer = playerGenerator()
    print("Welcome to the Premier League player guessing game! Test your "
          "Premier League knowledge by guessing the footballer in 10 tries!")
    firstGuess = input("Guess a Premier League Player (Last Name): ")
    playerSearch(firstGuess, answer, 1)


def playerSearch(guess, answer, attempt):
    guess = formatName(guess)
    if not verifyGuess(guess):
        print("Player not found in database! Guess again...")
        newGuess = input("Attempt #" + str(attempt) + " - Guess a Premier League Player (Last Name):")
        playerSearch(newGuess, answer, attempt)
    else:
        answerName = answer['name']
        if guess == answerName and findPlayer(guess)['club'] == answer['club']:
            print("You win!")
            print(printAnswer(answer))
            return True
        else:
            if attempt == 5:
                attempt += 1
                print("Incorrect!")
                hintChecker(guess, answer)
                playerValue = answer['value']
                print("Hint unlocked! Hidden player market value: €" + str(playerValue) + "m");
                newGuess = input("Attempt #" + str(attempt) + " - Guess a Premier League Player (Last Name):")
                playerSearch(newGuess, answer, attempt)
            elif attempt == 10:
                print("You are out of guesses, you lose!")
                print(printAnswer(answer))
                return False
            else:
                attempt += 1
                print("Incorrect!")
                hintChecker(guess, answer)
                newGuess = input("Attempt #" + str(attempt) + " - Guess a Premier League Player (Last Name):")
                playerSearch(newGuess, answer, attempt)

def printAnswer(footballer):
    return "Answer: " + footballer['answer'] + ", " + footballer['club'] + " " + \
        footballer['position'].lower() + " from " + footballer['nation']

def findPlayer(name):
    idx = 0
    for footballer in playerDatabase['name']:
        if name.lower() == footballer.lower():
            playerFound = True
            return playerDatabase.iloc[idx]
        idx += 1


def verifyGuess(guess):
    for footballer in playerDatabase['name']:
        if guess == footballer:
            return True
    return False

def formatName(name):
    name = name.lower()
    name = name.capitalize()
    name = name.replace("-", " ")
    return name

def hintChecker(footballer, answer):
    guessedPlayer = findPlayer(footballer)
    answerPlayer = findPlayer(answer['name'])
    if guessedPlayer['club'] == answerPlayer['club'] and hints[0] == False:
        print("Hint unlocked! Hidden player plays for " + answerPlayer['club'])
        hints[0] = True
    if guessedPlayer['position'] == answerPlayer['position'] and hints[1] == False:
        print("Hint unlocked! Hidden player is a " + answerPlayer['position'])
        hints[1] = True
    if guessedPlayer['nation'] == answerPlayer['nation'] and hints[2] == False:
        print("Hint unlocked! Hidden player is from " + answerPlayer['nation'])
        hints[2] = True


def playerGenerator():
    footballer = playerDatabase.loc[random.randint(0, len(playerDatabase) - 1)]
    return footballer


if __name__ == "__main__":
    begin()
