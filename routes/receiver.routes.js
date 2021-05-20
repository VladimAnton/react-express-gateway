const {Router} = require('express')
const Receiver = require('../models/Receiver')
const auth = require('../middleware/auth.middleware')
const router = Router()
const {check, validationResult} = require('express-validator')
const objectId = require('mongodb').ObjectID
const BodyParser = require('body-parser')
const Nexmo = require('nexmo')
const socketio = require('socket.io')
const config = require('config')

const nexmo = new Nexmo ({
    apiKey: config.get('apiKey'),
    apiSecret: config.get('apiSecret')
}, {debug: true})

// /make - сосздание пользователя (receiver) в видео /generate
router.post('/make',
    [   
        check('name', 'Поле не может быть пустым').isLength({ min: 1}),
        check('phoneNumber', 'Не INT').isInt(),
        check('phoneNumber', 'Не кореектный номер min').isLength({ min: 9}),
        check('phoneNumber', 'Не кореектный номер max').isLength({ max: 9}),
        auth],
    async (req, res) => { 
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array(), 
                message: 'Некорректные данные при создании получателя, попробуйте снова'
            })
        }
    
        const {name, phoneNumber} = req.body
        
        const existing = await Receiver.findOne({ phoneNumber })
        
        if(existing) {
            return res.json({ receiver: existing })
        }

        const receiver = new Receiver ({
           name, phoneNumber, owner: req.user.userId
        })

        await receiver.save()

        res.status(201).json({ receiver })
        
    } catch (e) {
        res.status(500).json(e.message)
    }
}) 

//получение всех получателей из базы
router.get('/', auth, async (req, res) => {
    try {
        const receivers = await Receiver.find({ owner: req.user.userId })
        res.json(receivers)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, Здесь попробуйте снова'})
    }
})

//получение конкретного пользователя из базы
router.get('/:id', auth, async(req, res) => {
    try {
        const receiver = await Receiver.findById(req.params.id)
        res.json(receiver)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
    }
})

// /update - обновление записи в БД
router.put('/update/:id',
    [   
    check('name', 'Поле не может быть пустым').isLength({ min: 1}),
    check('phoneNumber', 'Не INT').isInt(),
    check('phoneNumber', 'Не кореектный номер min').isLength({ min: 9}),
    check('phoneNumber', 'Не кореектный номер max').isLength({ max: 9}),
    auth],
    async (req, res) => { 
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array(), 
                message: 'Некорректные данные при обновлении получателя, попробуйте снова'
            })
        }

        const info = {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber
        }
        const id = req.params.id
        Receiver.updateOne({ '_id': objectId(id)}, {$set: info}, function(err, result){
            res.status(201).json({ message: 'Успешно обновлено' })
        })
    } catch (e) {
        res.status(500).json(e.message)
    }
}) 

// /delete - удаление записи в БД
router.delete('/delete/:id', auth, async (req, res) => { 
    try {
        const id = req.params.id
        Receiver.deleteOne({ '_id': objectId(id)}, function(err, result){
            res.status(201).json({ message: 'Успешно удалено' })
        })
    } catch (e) {
        res.status(500).json(e.message)
    }
}) 

// /smssend - отправка смс сообщения 
router.post(
    '/smssend',
    [   
        check('sms', 'Поле sms не может быть пустым').isLength({ min: 1}),
        auth],
    async (req, res) => { 
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array(), 
                message: 'Поле sms не может быть пустым'
            })
        }

        const phoneNumber = '380' + req.body.phoneNumber
        const sms = req.body.sms
        console.log('new phone number', phoneNumber)
        console.log('sms', sms)
        nexmo.message.sendSms(
            '380977927074', phoneNumber, sms, { type: 'unicode'}, 
            (err, responseData) => {
                if(err) {
                    console.log(err)
                }
                else{
                    console.dir(responseData)
                }
            }
        )
        res.status(201).json({ message: 'Сообщение успешно отправлено' })
    } catch (e) {
        res.status(500).json(e.message)
    }
}) 

// /smsmanysend - отправка смс сообщения 
router.post(
    '/smsmanysend',
    [   
        check('sms', 'Поле sms не может быть пустым').isLength({ min: 1}),
        check('from', 'Должен быть выбран как минимум один получатель').isLength({ min: 1}),
        auth],
    async (req, res) => { 
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array(), 
                message: 'Поле sms не может быть пустым и должен быть выбран как минимум один получатель'
            })
        }
        const sms = req.body.sms
        const phoneNumbers = req.body.from
        console.log('SMS:', sms)
        console.log('Phone Numbers:', phoneNumbers)

        /*for(let i=0; i < phoneNumbers.length; i++){
            nexmo.message.sendSms(
                '380501386723', phoneNumbers[i], sms, { type: 'unicode'}, 
                (err, responseData) => {
                    if(err) {
                        console.log(err)
                    }
                    else{
                        console.dir(responseData)
                    }
                }
            )
        }*/
        
        res.status(201).json({ message: 'Сообщение успешно отправлено' })
    } catch (e) {
        res.status(500).json(e.message)
    }
})


module.exports = router