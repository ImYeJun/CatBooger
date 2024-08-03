from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, db


cred = credentials.Certificate('./serviceAccountKey.json')
firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://petproject-34206-default-rtdb.firebaseio.com/'
})

app = Flask(__name__)
CORS(app)

db_ref = db.reference()

@app.route('/')
def index():
    return 'gehg'

#목욕db
@app.route('/add', methods=['POST'])
def add_bathing_event():
    data = request.json

    user_id = data.get('userId')
    bathing_id = data.get('bathingId')
    date = data.get('date')
    memo = data.get('memo')

    if not all([user_id, bathing_id, date, memo]):
        return jsonify({"error": "Missing data fields"}), 400

    try:
        # 사용자 ID에 해당하는 경로 생성
        user_ref = db_ref.child('checklists').child(user_id).child('bathing')

        # 목욕 이벤트 추가
        new_bathing_ref = user_ref.push({
            'bathingId': bathing_id, #bathing_id 자동 증가가 안됨
            'dates': [
                {
                    'date': date,
                    'memo': memo
                }
            ]
        })

        return jsonify({"message": "Bathing event added successfully", "id": new_bathing_ref.key}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_bathing_events/<user_id>', methods=['GET'])
def get_bathing_events(user_id):
    try:
        # 사용자 ID에 해당하는 목욕 데이터 경로
        user_ref = db_ref.child('checklists').child(user_id).child('bathing')
        
        # 데이터 가져오기
        bathing_events = user_ref.get()

        if bathing_events is None:
            return jsonify({"message": "No data found for this user."}), 404

        return jsonify(bathing_events), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/delete_bathing_event/<user_id>/<bathing_id>', methods=['DELETE'])
def delete_bathing_event(user_id, bathing_id):
    try:
        # 사용자 ID와 목욕 ID에 해당하는 경로 설정
        bathing_ref = db_ref.child('checklists').child(user_id).child('bathing').child(bathing_id)
        
        # 데이터 존재 여부 확인
        if bathing_ref.get() is None:
            return jsonify({"message": "Bathing event not found."}), 404
        
        # 데이터 삭제
        bathing_ref.delete()

        return jsonify({"message": "Bathing event deleted successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#defecation db

#feeding db
@app.route('/add_feeding_event', methods=['POST'])
def add_feeding_event():
    data = request.json

    user_id = data.get('userId')
    feeding_id = data.get('feedingId')
    date = data.get('date')
    memo = data.get('memo')

    if not all([user_id, feeding_id, date, memo]):
        return jsonify({"error": "Missing data fields"}), 400

    try:
        # 사용자 ID에 해당하는 경로 생성
        user_ref = db_ref.child('checklists').child(user_id).child('feeding')

        # 밥 이벤트 추가
        new_feeding_ref = user_ref.push({
            'feedingId': feeding_id,
            'dates': [
                {
                    'date': date,
                    'memo': memo
                }
            ]
        })

        return jsonify({"message": "Feeding event added successfully", "id": new_feeding_ref.key}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/get_feeding_events/<user_id>', methods=['GET'])
def get_feeding_events(user_id):
    try:
        # 사용자 ID에 해당하는 목욕 데이터 경로
        user_ref = db_ref.child('checklists').child(user_id).child('feeding')
        
        # 데이터 가져오기
        feeding_events  = user_ref.get()

        if feeding_events is None:
            return jsonify({"message": "No data found for this user."}), 404

        return jsonify(feeding_events), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/delete_feeding_event/<user_id>/<feeding_id>', methods=['DELETE'])
def delete_feeding_event(user_id, feeding_id):
    try:
        # 사용자 ID와 밥 ID에 해당하는 경로 설정
        feeding_ref = db_ref.child('checklists').child(user_id).child('feeding').child(feeding_id)
        
        # 데이터 존재 여부 확인
        if feeding_ref.get() is None:
            return jsonify({"message": "Feeding event not found."}), 404
        
        # 데이터 삭제
        feeding_ref.delete()

        return jsonify({"message": "Feeding event deleted successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
#medication db
@app.route('/add_medication_event', methods=['POST'])
def add_medication_event():
    data = request.json

    user_id = data.get('userId')
    medication_id = data.get('medicationId')
    date = data.get('date')
    memo = data.get('memo')
    name = data.get('name')

    if not all([user_id, medication_id, date, memo, name]):
        return jsonify({"error": "Missing data fields"}), 400

    try:
        # 사용자 ID에 해당하는 경로 생성
        user_ref = db_ref.child('checklists').child(user_id).child('medication')

        # 약물 이벤트 추가
        new_medication_ref = user_ref.push({
            'medicationId': medication_id,
            'dates': [
                {
                    'date': date,
                    'memo': memo,
                    'name': name
                }
            ]
        })

        return jsonify({"message": "Medication event added successfully", "id": new_medication_ref.key}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_medication_events/<user_id>', methods=['GET'])
def get_medication_events(user_id):
    try:
        # 사용자 ID에 해당하는 약물 데이터 경로
        user_ref = db_ref.child('checklists').child(user_id).child('medication')
        
        # 데이터 가져오기
        medication_events = user_ref.get()

        if medication_events is None:
            return jsonify({"message": "No data found for this user."}), 404

        return jsonify(medication_events), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/delete_medication_event/<user_id>/<medication_id>', methods=['DELETE']) #medication_id = 추가 db에서 child('medication') 이부분임
def delete_medication_event(user_id, medication_id):
    try:
        # 사용자 ID와 medication ID에 해당하는 경로 설정
        medication_ref = db_ref.child('checklists').child(user_id).child('medication').child(medication_id)
        
        # 데이터 존재 여부 확인
        if medication_ref.get() is None:
            return jsonify({"message": "Medication event not found."}), 404
        
        # 데이터 삭제
        medication_ref.delete()

        return jsonify({"message": "Medication event deleted successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#vaccionation db
@app.route('/add_vaccination_event', methods=['POST'])
def add_vaccination_event():
    data = request.json

    user_id = data.get('userId')
    vaccination_id = data.get('vaccinationId')
    date = data.get('date')
    memo = data.get('memo')

    if not all([user_id, vaccination_id, date, memo]):
        return jsonify({"error": "Missing data fields"}), 400

    try:
        # 사용자 ID에 해당하는 경로 생성
        user_ref = db_ref.child('checklists').child(user_id).child('vaccination')

        # 예방 접종 이벤트 추가
        new_vaccination_ref = user_ref.push({
            'vaccinationId': vaccination_id,
            'dates': [
                {
                    'date': date,
                    'memo': memo
                }
            ]
        })

        return jsonify({"message": "Vaccination event added successfully", "id": new_vaccination_ref.key}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_vaccination_events/<user_id>', methods=['GET'])
def get_vaccination_events(user_id):
    try:
        # 사용자 ID에 해당하는 예방 접종 데이터 경로
        user_ref = db_ref.child('checklists').child(user_id).child('vaccination')
        
        # 데이터 가져오기
        vaccination_events = user_ref.get()

        if vaccination_events is None:
            return jsonify({"message": "No data found for this user."}), 404

        return jsonify(vaccination_events), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/delete_vaccination_event/<user_id>/<vaccination_id>', methods=['DELETE'])
def delete_vaccination_event(user_id, vaccination_id):
    try:
        # 사용자 ID와 예방 접종 ID에 해당하는 경로 설정
        vaccination_ref = db_ref.child('checklists').child(user_id).child('vaccination').child(vaccination_id)
        
        # 데이터 존재 여부 확인
        if vaccination_ref.get() is None:
            return jsonify({"message": "Vaccination event not found."}), 404
        
        # 데이터 삭제
        vaccination_ref.delete()

        return jsonify({"message": "Vaccination event deleted successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#walking db
@app.route('/add_walking_event', methods=['POST'])
def add_walking_event():
    data = request.json

    user_id = data.get('userId')
    walking_id = data.get('walkingId')
    date = data.get('date')
    memo = data.get('memo')

    if not all([user_id, walking_id, date, memo]):
        return jsonify({"error": "Missing data fields"}), 400

    try:
        # 사용자 ID에 해당하는 경로 생성
        user_ref = db_ref.child('checklists').child(user_id).child('walking')

        # 산책 이벤트 추가
        new_walking_ref = user_ref.push({
            'walkingId': walking_id,
            'dates': [
                {
                    'date': date,
                    'memo': memo
                }
            ]
        })

        return jsonify({"message": "Walking event added successfully", "id": new_walking_ref.key}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_walking_events/<user_id>', methods=['GET'])
def get_walking_events(user_id):
    try:
        # 사용자 ID에 해당하는 산책 데이터 경로
        user_ref = db_ref.child('checklists').child(user_id).child('walking')
        
        # 데이터 가져오기
        walking_events = user_ref.get()

        if walking_events is None:
            return jsonify({"message": "No data found for this user."}), 404

        return jsonify(walking_events), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/delete_walking_event/<user_id>/<walking_id>', methods=['DELETE'])
def delete_walking_event(user_id, walking_id):
    try:
        # 사용자 ID와 walking ID에 해당하는 경로 설정
        walking_ref = db_ref.child('checklists').child(user_id).child('walking').child(walking_id)
        
        # 데이터 존재 여부 확인
        if walking_ref.get() is None:
            return jsonify({"message": "Walking event not found."}), 404
        
        # 데이터 삭제
        walking_ref.delete()

        return jsonify({"message": "Walking event deleted successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#weight db
@app.route('/add_weight_event', methods=['POST'])
def add_weight_event():
    data = request.json

    user_id = data.get('userId')
    weight_kg_id = data.get('weightKgId')
    date = data.get('date')
    memo = data.get('memo')
    weight_kg = data.get('weightKg')

    if not all([user_id, weight_kg_id, date, memo, weight_kg]):
        return jsonify({"error": "Missing data fields"}), 400

    try:
        # 사용자 ID에 해당하는 경로 생성
        user_ref = db_ref.child('checklists').child(user_id).child('weight')

        # 체중 기록 이벤트 추가
        new_weight_ref = user_ref.push({
            'weightKgId': weight_kg_id,
            'dates': [
                {
                    'date': date,
                    'memo': memo,
                    'weightKg': weight_kg
                }
            ]
        })

        return jsonify({"message": "Weight event added successfully", "id": new_weight_ref.key}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_weight_events/<user_id>', methods=['GET'])
def get_weight_events(user_id):
    try:
        # 사용자 ID에 해당하는 체중 데이터 경로
        user_ref = db_ref.child('checklists').child(user_id).child('weight')
        
        # 데이터 가져오기
        weight_events = user_ref.get()

        if weight_events is None:
            return jsonify({"message": "No data found for this user."}), 404

        return jsonify(weight_events), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/delete_weight_event/<user_id>/<weight_kg_id>', methods=['DELETE'])
def delete_weight_event(user_id, weight_kg_id):
    try:
        # 사용자 ID와 체중 기록 ID에 해당하는 경로 설정
        weight_ref = db_ref.child('checklists').child(user_id).child('weight').child(weight_kg_id)
        
        # 데이터 존재 여부 확인
        if weight_ref.get() is None:
            return jsonify({"message": "Weight event not found."}), 404
        
        # 데이터 삭제
        weight_ref.delete()

        return jsonify({"message": "Weight event deleted successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':   
    app.run(host="0.0.0.0", port=5001)