from chatterbot import ChatBot
from chatterbot.conversation import Statement
import sys
from chatterbot.trainers import ListTrainer


chatbot = ChatBot('Basic Bot',
                  logic_adapters=[
                      {
                          'import_path': 'chatterbot.logic.BestMatch'
                      },
                      {
                          'import_path': 'chatterbot.logic.MathematicalEvaluation'
                      },
                      {
                          'import_path': 'chatterbot.logic.TimeLogicAdapter'
                      },
                      {
                          'import_path': 'chatterbot.logic.LowConfidenceAdapter',
                          'threshold': 0.65,
                          'default_response': 'I am sorry, but I am not aware of this. I am still learning.'
                      }
                  ],
                  filters=["chatterbot.filters.RepetitiveResponseFilter"],
                  database='./python/chatterbot_db.sqlite3')

input = sys.argv[1]
# print(input)
print(chatbot.get_response(input))
