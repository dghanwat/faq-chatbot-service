from chatterbot import ChatBot
from chatterbot.conversation import Statement
import sys
from chatterbot.trainers import ListTrainer


# chatbot = ChatBot('Basic Bot',
#                   logic_adapters=[
#                       {
#                           'import_path': 'chatterbot.logic.BestMatch'
#                       },
#                       {
#                           'import_path': 'chatterbot.logic.MathematicalEvaluation'
#                       },
#                       {
#                           'import_path': 'chatterbot.logic.TimeLogicAdapter'
#                       },
#                       {
#                           'import_path': 'chatterbot.logic.LowConfidenceAdapter',
#                           'threshold': 0.65,
#                           'default_response': 'I am sorry, but I am not aware of this. I am still learning.'
#                       }
#                   ],
#                   filters=["chatterbot.filters.RepetitiveResponseFilter"],
#                   database='./db.sqlite3')

chatbot = ChatBot('Chatbot Backed by MongoDB',
                  storage_adapter="chatterbot.storage.MongoDatabaseAdapter",
                  database="chatterbot_db",
                  database_uri='mongodb://192.168.99.100:27017/',
                  logic_adapters=[
                      {
                          'import_path': 'chatterbot.logic.LowConfidenceAdapter',
                          'threshold': 0.60,
                          'default_response': 'I am sorry, but I am not aware of this. I am still learning.'
                      },
                      {
                          'import_path': 'chatterbot.logic.BestMatch'
                      },
                      {
                          'import_path': 'chatterbot.logic.MathematicalEvaluation'
                      },
                      {
                          'import_path': 'chatterbot.logic.TimeLogicAdapter'
                      }
                      
                  ],
                  filters=["chatterbot.filters.RepetitiveResponseFilter"])

# statement = chatbot.input.process_input('what is 4 + 8')
# response = chatbot.logic.process(statement)
# chatbot.set_trainer(ListTrainer)
# chatbot.train(['What is your name?', 'My name is Ben'])
input = sys.argv[1]
# print(input)
print(chatbot.get_response(input))
