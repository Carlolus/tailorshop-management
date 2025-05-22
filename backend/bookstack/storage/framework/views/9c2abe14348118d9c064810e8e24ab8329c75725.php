
<div component="dropzone"
     option:dropzone:url="<?php echo e($url); ?>"
     option:dropzone:success-message="<?php echo e($successMessage ?? ''); ?>"
     option:dropzone:remove-message="<?php echo e(trans('components.image_upload_remove')); ?>"
     option:dropzone:upload-limit="<?php echo e(config('app.upload_limit')); ?>"
     option:dropzone:upload-limit-message="<?php echo e(trans('errors.server_upload_limit')); ?>"
     option:dropzone:timeout-message="<?php echo e(trans('errors.file_upload_timeout')); ?>"

     class="dropzone-container text-center">
    <button type="button" class="dz-message"><?php echo e($placeholder); ?></button>
</div><?php /**PATH /var/www/bookstack/resources/views/form/dropzone.blade.php ENDPATH**/ ?>