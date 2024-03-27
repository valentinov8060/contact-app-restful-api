import {app} from './app/web.js'
import {logger} from './app/logging.js'

app.listen(3000, () => {
    logger.info('Server running on port 3000')
})