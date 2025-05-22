<textarea id="<?php echo e($name); ?>" name="<?php echo e($name); ?>" rows="5"
          <?php if($errors->has($name)): ?> class="text-neg" <?php endif; ?>><?php if(isset($model) || old($name)): ?><?php echo e(old($name) ? old($name) : $model->$name); ?><?php endif; ?></textarea>
<?php if($errors->has($name)): ?>
    <div class="text-neg text-small"><?php echo e($errors->first($name)); ?></div>
<?php endif; ?><?php /**PATH /var/www/bookstack/resources/views/form/textarea.blade.php ENDPATH**/ ?>