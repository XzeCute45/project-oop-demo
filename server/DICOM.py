from flask import Flask, redirect, url_for,jsonify, request
import numpy as np
import pydicom
from PIL import Image
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

#บรรทัดที่ 10 รับ path/image มาจาก api
@app.route('/api')
def JPG():
    name = request.args['img']
    im = pydicom.dcmread(name) #read รูป
    im = im.pixel_array.astype(float) 
    rescaled_image = (np.maximum(im,0)/im.max())*255 #รูป dcm มัน pixel ไม่เท่ากันก็ต้องแปลงให้อยู่ในช่วง
    final_image = np.uint8(rescaled_image)  #rescaled รูปเป็น 8bit เพราะ RGB 8bit
    final_image = Image.fromarray(final_image)  #ตอนแรกเป็น pixel เก็บเป็นรูป ใส่ตัวแปรไว้ก่อน
    final_image.save('../api/image/change.jpg') #เป็นการ save รูปไว้ในโฟลเดอร์แบบ base64
    return name  #return base64 กลับไป

if __name__ == "__main__":
    app.run(debug=True)

#บรรทัดที่ 12 - 17 เป็นการแปลงรูป
#บรรทัดที่ 18 เป็นการ save รูปที่เป็นไฟล์ base64

 