import {app} from './app/app.js'
import {logger} from './app/logging.js'

app.listen(3000, () => {
    logger.info('Server running on port 3000')
})